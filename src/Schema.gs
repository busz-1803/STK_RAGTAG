/**
 * ==========================================================
 * STK_RAGTAG
 * Schema.gs
 * Version 1.0.0
 * ==========================================================
 */

class Schema {

  /**
   * Create Sheet
   */
  static createSheet(sheetName, headers) {

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clear();
    }

    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers]);

    this.setHeaderStyle(sheet, headers.length);
    this.freezeHeader(sheet);
    this.autoResize(sheet, headers.length);

    return sheet;

  }

  /**
   * Header Style
   */
  static setHeaderStyle(sheet, totalColumns) {

    sheet.getRange(1, 1, 1, totalColumns)
      .setFontWeight("bold")
      .setBackground("#1F4E78")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center");

  }

  /**
   * Freeze Header
   */
  static freezeHeader(sheet) {

    sheet.setFrozenRows(1);

  }

  /**
   * Auto Resize
   */
  static autoResize(sheet, totalColumns) {

    sheet.autoResizeColumns(1, totalColumns);

  }

  /**
   * Create All Sheets
   */
  static createAllSheets() {

    this.createSheet(SHEET.CONFIG, ["KEY","VALUE"]);

    this.createSheet(SHEET.STORE, [
      "STORE_CODE",
      "STORE_NAME"
    ]);

    this.createSheet(SHEET.PRODUCT, [
      "BARCODE",
      "SKU",
      "PRODUCT_NAME",
      "CATEGORY",
      "COLOR",
      "SIZE",
      "PRICE"
    ]);

    this.createSheet(SHEET.LOCATION, [
      "BARCODE",
      "LOCATION"
    ]);

    this.createSheet(SHEET.SESSION, [
      "SESSION_ID",
      "STORE",
      "VERSION",
      "STATUS",
      "CREATE_DATE"
    ]);

    this.createSheet(SHEET.STOCK, [
      "SESSION_ID",
      "ST_CODE",
      "BARCODE",
      "SKU",
      "PRODUCT",
      "COLOR",
      "SIZE",
      "QTY",
      "PRICE"
    ]);

    this.createSheet(SHEET.CHECK, [
      "SESSION_ID",
      "VERSION",
      "STORE",
      "LOCATION",
      "BARCODE",
      "QTY"
    ]);

    this.createSheet(SHEET.SUMMARY, [
      "SESSION_ID",
      "VERSION",
      "TOTAL_SKU",
      "MATCH",
      "OVER",
      "SHORT",
      "UNKNOWN",
      "ONHAND_QTY",
      "COUNT_QTY",
      "DIFF_QTY",
      "DIFF_AMOUNT",
      "CREATE_DATE"
    ]);

    this.createSheet(SHEET.DIFF, [
      "SESSION_ID",
      "VERSION",
      "STORE",
      "BARCODE",
      "SKU",
      "PRODUCT_NAME",
      "COLOR",
      "SIZE",
      "LOCATION",
      "ONHAND_QTY",
      "COUNT_QTY",
      "DIFF_QTY",
      "SALE_PRICE",
      "DIFF_AMOUNT",
      "STATUS",
      "REMARK",
      "COMPARE_DATE"
    ]);

    this.createSheet(SHEET.REPORT_LOCATION, [
      "LOCATION",
      "BARCODE",
      "SKU",
      "PRODUCT_NAME",
      "QTY"
    ]);

    this.createSheet(SHEET.RUNNING, [
      "PREFIX",
      "LAST_NO"
    ]);

    this.createSheet(SHEET.AUDIT, [
      "DATE",
      "USER",
      "ACTION",
      "REFERENCE",
      "RESULT"
    ]);

    this.createSheet(SHEET.EMAIL, [
      "DATE",
      "TO",
      "SUBJECT",
      "STATUS"
    ]);

    this.createSheet(SHEET.FILE, [
      "DATE",
      "FILE_NAME",
      "TYPE",
      "PATH"
    ]);

  }

  /**
   * Create System Config
   */
  static createSystemConfig() {

    // จะเพิ่มในขั้นถัดไป

  }

  /**
   * Create Running Number
   */
  static createRunningNo() {

    // จะเพิ่มในขั้นถัดไป

  }

  /**
   * Initialize Database
   */
  static initialize() {

    this.createAllSheets();
    this.createSystemConfig();
    this.createRunningNo();

  }

  /**
   * Install Database
   */
  static install() {

    this.initialize();

    SpreadsheetApp.getUi().alert(
      "Database Installed Successfully."
    );

  }

}
