class ImportStock {

  static run() {
    ...
  }

  static getLatestFile() {
    ...
  }

  /**
   * Import Excel File
   */
  static importFile(file, sessionId) {

    const rows = ExcelService.readData(file);

    if (rows.length <= 1) {
      throw new Error("No Data.");
    }

    Logger.info("Rows : " + rows.length);

    this.updateProduct(rows);

    this.importStock(rows, sessionId);

  }

  /**
   * Import STOCK_ONHAND
   */
  static importStock(rows, sessionId) {

    const data = [];

    for (let i = 1; i < rows.length; i++) {

      const r = rows[i];

      data.push([
        sessionId,
        r[0], // ST_CODE
        r[1], // BARCODE
        r[2], // SKU
        r[3], // PRODUCT
        r[4], // COLOR
        r[5], // SIZE
        Number(r[6]),
        Number(r[7])
      ]);

    }

    if (data.length === 0) return;

    const sh = SheetService.getSheet(SHEET.STOCK);

    sh.getRange(
      sh.getLastRow() + 1,
      1,
      data.length,
      data[0].length
    ).setValues(data);

  }

  /**
   * Update PRODUCT_MASTER
   */
  static updateProduct(rows) {

    const sh = SheetService.getSheet(SHEET.PRODUCT);

    const current = {};

    SheetService.getData(SHEET.PRODUCT).forEach(r => {
      current[r[0]] = true;
    });

    const add = [];

    for (let i = 1; i < rows.length; i++) {

      const r = rows[i];

      if (current[r[1]]) continue;

      add.push([
        r[1], // BARCODE
        r[2], // SKU
        r[3], // PRODUCT
        "",
        r[4], // COLOR
        r[5], // SIZE
        "ACTIVE"
      ]);

    }

    if (add.length > 0) {

      sh.getRange(
        sh.getLastRow() + 1,
        1,
        add.length,
        add[0].length
      ).setValues(add);

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
