/**
 * ==========================================================
 * STK_RAGTAG
 * ImportHandheld.gs
 * Version 1.0.0
 * ==========================================================
 */

class ImportHandheld {

  /**
   * Main Process
   */
  /**
 * Main Process
 */
static run() {

  try {

    AppLogger.info("Import Handheld Started");

    const file = FileService.getLatestFile(
      "IMPORT_HANDHELD_FOLDER_ID"
    );

    if (!file) {
      throw new Error("Handheld file not found.");
    }

    const text = file
      .getBlob()
      .getDataAsString(ENCODING.UTF8);

    const rows = this.parse(text);

    const sessionId = Config.getSession();

    Validation.required(
      sessionId,
      "Current Session not found."
    );

    const version =
      this.getNextVersion(sessionId);

    this.saveCheck(
      rows,
      sessionId,
      version
    );

    this.updateLocation(rows);

    FileService.saveLog(
      sessionId,
      version,
      "HANDHELD",
      file.getName(),
      file.getId()
    );

    SpreadsheetApp.getUi().alert(
      "Import Handheld Success"
    );

    AppLogger.info("Import Handheld Completed");

  } catch (e) {

    AppLogger.error(e);

    SpreadsheetApp.getUi().alert(
      e.message
    );

  }

}

   /**
 * Parse Handheld Text
 */
static parse(text) {

  const lines = text.split(/\r?\n/);

  const rows = [];

  lines.forEach(line => {

    line = String(line).trim();

    if (line === "") return;

    rows.push(
      line.split("|")
    );

  });

  AppLogger.info(
    "Handheld Rows : " + rows.length
  );

  return rows;

}

  /**
   * Get Next Version
   */
  /**
 * Get Next Version
 */
static getNextVersion(sessionId) {

  const rows = SheetService.getData(
    SHEET.CHECK
  );

  let version = 0;

  rows.forEach(r => {

    if (String(r[0]) === String(sessionId)) {

      version = Math.max(
        version,
        Helper.toNumber(r[1])
      );

    }

  });

  AppLogger.info(
    "Next Version : " + (version + 1)
  );

  return version + 1;

}

  /**
   * Save CHECK_STOCK
   */
  /**
 * Save CHECK_STOCK
 */
static saveCheck(rows, sessionId, version) {

  const data = [];

  rows.forEach(r => {

    data.push([

      sessionId,

      version,

      Config.getStore(),

      r[2],                           // LOCATION

      Helper.barcode(r[0]),           // BARCODE

      Helper.toNumber(r[3]),          // QTY

      new Date()

    ]);

  });

  if (data.length === 0) {
    return;
  }

  SheetService.appendRows(
    SHEET.CHECK,
    data
  );

  AppLogger.info(
    "Save CHECK_STOCK : " +
    data.length +
    " rows"
  );

}
  /**
   * Update LOCATION_MASTER
   */
  /**
 * Update LOCATION_MASTER
 */
static updateLocation(rows) {

  const current = {};
  const add = [];

  // อ่าน LOCATION_MASTER เดิม
  DatabaseService.locations().forEach(r => {

    current[
      Helper.barcode(r[0])
    ] = true;

  });

  // เพิ่มเฉพาะ Barcode ที่ยังไม่มี
  rows.forEach(r => {

    const barcode = Helper.barcode(r[0]);

    if (current[barcode]) {
      return;
    }

    add.push([

      barcode,

      r[2]     // LOCATION

    ]);

  });

  if (add.length === 0) {

    return;

  }

  SheetService.appendRows(
    SHEET.LOCATION,
    add
  );

  AppLogger.info(
    "New Locations : " + add.length
  );

}
}
