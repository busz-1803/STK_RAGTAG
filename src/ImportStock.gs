class ImportStock {

  static run() {
    ...
  }

  static getLatestFile() {
    ...
  }

  static importFile(file, sessionId) {

  const rows = ExcelService.readData(file);

  if (rows.length <= 1) {
    throw new Error("Excel ไม่มีข้อมูล");
  }

  const headers = rows[0];

  const map = this.getHeaderMap(headers);

  this.validateHeader(map);

  Logger.info("Rows : " + (rows.length - 1));

  this.updateProduct(rows, map);

  this.importStock(rows, map, sessionId);

}

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

  for (let i = 1; i < rows.length; i++) {

  const r = rows[i];

  const barcode = Helper.barcode(r[map.BARCODE]);

  if (current[barcode]) continue;

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

  /**
   * Create SESSION_MASTER
   */
  static createSession(sessionId) {

    SheetService.append(
      SHEET.SESSION,
      [
        sessionId,
        "",
        "",
        new Date(),
        1,
        "OPEN",
        new Date(),
        Session.getActiveUser().getEmail()
      ]
    );

  }

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

  if (missing.length) {
    throw new Error(
      "Missing Columns : " + missing.join(", ")
    );
  }

}
