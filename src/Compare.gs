/**
 * ==========================================================
 * STK_RAGTAG
 * Compare.gs
 * ==========================================================
 */

class Compare {

  /**
   * Main Process
   */
  static run() {

    try {

      AppLogger.info("Compare Started");

      const sessionId = Config.getSession();

      Validation.required(
        sessionId,
        "Current Session not found."
      );

      const version = this.getLatestVersion(sessionId);

      const result = this.execute(
        sessionId,
        version
      );

      this.save(result);

      SpreadsheetApp.getUi().alert(
        "Compare Complete"
      );

    } catch (e) {

      AppLogger.error(e);

      SpreadsheetApp.getUi().alert(
        e.message
      );

    }

  }

  /**
   * Get Latest Version
   */
  static getLatestVersion(sessionId) {

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

    Validation.required(
      version > 0,
      "Handheld data not found."
    );

    return version;

  }

  /**
   * Execute Compare
   */
  static execute(sessionId, version) {

    const stock = SheetService.getData(SHEET.STOCK)
      .filter(r => String(r[0]) === String(sessionId));

    const check = SheetService.getData(SHEET.CHECK)
      .filter(r =>
        String(r[0]) === String(sessionId) &&
        Number(r[1]) === Number(version)
      );

    const stockMap = {};
    const checkMap = {};

    stock.forEach(r => {
      stockMap[Helper.barcode(r[2])] = r;
    });

    check.forEach(r => {
      checkMap[Helper.barcode(r[4])] = r;
    });

    const result = [];

    Object.keys(stockMap).forEach(barcode => {

      const stockRow = stockMap[barcode];
      const checkRow = checkMap[barcode];

      const onhandQty = Helper.toNumber(stockRow[7]);
      const countQty = checkRow
        ? Helper.toNumber(checkRow[5])
        : 0;

      const diffQty = countQty - onhandQty;

      result.push({

        sessionId: sessionId,

        version: version,

        barcode: barcode,

        sku: stockRow[3],

        productName: stockRow[4],

        color: stockRow[5],

        size: stockRow[6],

        onhandQty: onhandQty,

        countQty: countQty,

        diffQty: diffQty,

        status: this.getStatus(diffQty),

        diffAmount:
          diffQty *
          Helper.toNumber(stockRow[8]),

        salePrice:
          Helper.toNumber(stockRow[8])

      });

    });

    return result;

  }

  /**
 * Save Compare Result
 */
static save(result) {

  if (!result || result.length === 0) {
    return;
  }

  const data = result.map(r => [

    r.sessionId,
    r.version,
    r.barcode,
    r.sku,
    r.productName,
    r.color,
    r.size,
    r.onhandQty,
    r.countQty,
    r.diffQty,
    r.status,
    r.salePrice,
    r.diffAmount

  ]);

  SheetService.appendRows(
    SHEET.DIFF,
    data
  );

  AppLogger.info(
    "Save DIFF_RESULT : " +
    data.length +
    " rows"
  );

}

  /**
   * Get Compare Status
   */
  static getStatus(diffQty) {

    if (diffQty === 0) {
      return "MATCH";
    }

    if (diffQty > 0) {
      return "OVER";
    }

    return "SHORT";

  }

}
