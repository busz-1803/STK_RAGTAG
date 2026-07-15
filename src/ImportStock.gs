class ImportStock {

  /**
 * Main Process
 */
static run() {

  try {

    AppLogger.info("Import Stock Started");

    // สร้าง Session ID
    const sessionId = Helper.uuid();

    // บันทึก Session
    this.createSession(sessionId);

    // หาไฟล์ล่าสุด
    const file = this.getLatestFile();

    // นำเข้าข้อมูล
    this.importFile(file, sessionId);

    AppLogger.info("Import Stock Completed");

    SpreadsheetApp.getUi().alert(
      "Import Success\nSession : " + sessionId
    );

  } catch (e) {

    AppLogger.error(e);

    SpreadsheetApp.getUi().alert(e.message);

  }

}

  /**
 * Get Latest Excel File
 */
static getLatestFile() {

  const folderId = Config.get("IMPORT_STOCK_FOLDER_ID");

  if (!folderId) {
    throw new Error("IMPORT_STOCK_FOLDER_ID not found.");
  }

  const folder = DriveApp.getFolderById(folderId);

  let latestFile = null;
  let latestTime = 0;

  const files = folder.getFiles();

  while (files.hasNext()) {

    const file = files.next();

    const name = file.getName().toLowerCase();

    // รับเฉพาะไฟล์ Excel
    if (
      !name.endsWith(".xlsx") &&
      !name.endsWith(".xls")
    ) {
      continue;
    }

    const time = file.getLastUpdated().getTime();

    if (time > latestTime) {

      latestTime = time;
      latestFile = file;

    }

  }

  if (!latestFile) {
    throw new Error("No Excel file found.");
  }

  AppLogger.info(
    "Latest File : " + latestFile.getName()
  );

  return latestFile;

}

  /**
 * Import Excel File
 */
static importFile(file, sessionId) {

  if (!file) {
    throw new Error("Import file not found.");
  }

  // อ่านข้อมูลจาก Excel
  const rows = ExcelService.readData(file);

  if (!rows || rows.length <= 1) {
    throw new Error("Excel ไม่มีข้อมูล");
  }

  // Header
  const headers = rows[0];

  // Mapping Column
  const map = this.getHeaderMap(headers);

  // ตรวจสอบ Header
  this.validateHeader(map);

  AppLogger.info(
    "Import Rows : " + (rows.length - 1)
  );

  // Update PRODUCT_MASTER
  this.updateProduct(rows, map);

  // Import STOCK_ONHAND
  this.importStock(
    rows,
    map,
    sessionId
  );

}

  /**
 * Update PRODUCT_MASTER
 */
static updateProduct(rows, map) {

  // Barcode ที่มีอยู่แล้ว
  const current = {};

  DatabaseService.products().forEach(r => {

    current[
      Helper.barcode(r[0])
    ] = true;

  });

  const add = [];

  for (let i = 1; i < rows.length; i++) {

    const r = rows[i];

    const barcode =
      Helper.barcode(r[map.BARCODE]);

    // มีแล้ว ไม่ต้องเพิ่ม
    if (current[barcode]) {
      continue;
    }

    add.push([

      barcode,

      r[map.SKU_CODE],

      r[map.PRODUCT_NAME],

      "",

      r[map.COLOR],

      r[map.SIZE],

      "ACTIVE"

    ]);

  }

  if (add.length > 0) {

    SheetService.appendRows(
      SHEET.PRODUCT,
      add
    );

    AppLogger.info(
      "New Products : " + add.length
    );

  }

}

  /**
 * Import STOCK_ONHAND
 */
static importStock(rows, map, sessionId) {

  const data = [];

  for (let i = 1; i < rows.length; i++) {

    const r = rows[i];

    data.push([

      sessionId,

      r[map.ST_CODE],

      Helper.barcode(r[map.BARCODE]),

      r[map.SKU_CODE],

      r[map.PRODUCT_NAME],

      r[map.COLOR],

      r[map.SIZE],

      Helper.toNumber(r[map.ONHAND_QTY]),

      Helper.toNumber(r[map.SALE_PRICE])

    ]);

  }

  if (data.length > 0) {

    SheetService.appendRows(
      SHEET.STOCK,
      data
    );

    AppLogger.info(
      "Import Stock : " + data.length + " rows"
    );

  }

}

  /**
 * Create SESSION_MASTER
 */
static createSession(sessionId) {

  SheetService.append(
    SHEET.SESSION,
    [

      sessionId,

      "",              // Store Code

      "",              // Stock Date

      new Date(),      // Import Date

      1,               // Version

      "OPEN",          // Status

      new Date(),      // Create Date

      Session.getActiveUser().getEmail()

    ]
  );

  AppLogger.info(
    "Create Session : " + sessionId
  );

}
  /**
 * Create Header Map
 */
static getHeaderMap(headers) {

  const map = {};

  headers.forEach((name, index) => {

    map[String(name).trim().toUpperCase()] = index;

  });

  return map;

}
/**
 * Validate Required Header
 */
static validateHeader(map) {

  const required = [
    "ST_CODE",
    "BARCODE",
    "SKU_CODE",
    "PRODUCT_NAME",
    "COLOR",
    "SIZE",
    "ONHAND_QTY",
    "SALE_PRICE"
  ];

  const missing = [];

  required.forEach(col => {

    if (map[col] === undefined) {
      missing.push(col);
    }

  });

  if (missing.length > 0) {

    throw new Error(
      "Missing Columns : " + missing.join(", ")
    );

  }

}
}
