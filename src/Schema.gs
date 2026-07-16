static createAllSheets() {

  this.createSheet(SHEET.CONFIG, [
    "KEY",
    "VALUE"
  ]);

  this.createSheet(SHEET.STORE, [
    "ST_COD",
    "ST_NAME",
    "BUSI_PROD",
    "BUSI_NAME"
  ]);

  this.createSheet(SHEET.PRODUCT, [
    "BUSI_PROD",
    "PROD_CODE",
    "BARCODE",
    "CATEGORY",
    "PRICE",
    "PRICE1",
    "DESCRIPTION"
  ]);

  this.createSheet(SHEET.STOCK, [
    "SESSION_ID",
    "ENDING_DATE",
    "ST_CODE",
    "ST_NAME",
    "BUSI_PROD",
    "BUSI_NAME",
    "PROD_CODE",
    "BARCODE",
    "STOCK_ONHAND",
    "SALE_PRICE",
    "DESCRIPTION"
  ]);

  this.createSheet(SHEET.CHECK, [
    "SESSION_ID",
    "VERSION",
    "ST_COD",
    "BUSI_PROD",
    "PROD_CODE",
    "QTY",
    "PRICE",
    "S_PRICE",
    "BAR_CODE",
    "CHK_DAT",
    "CHK_TYPE",
    "HAND_CODE",
    "LOCATION",
    "CORNER",
    "CATEGORY PBILL",
    "DESCRIPTION"
  ]);

  this.createSheet(SHEET.SUMMARY, [
    "SESSION_ID",
    "VERSION",
    "ST_COD",
    "ST_NAME",
    "ยอดในระบบ",
    "ยอดนับจริง",
    "ผลต่าง (Diff)",
    "มูลค่าระบบ",
    "มูลค่านับจริง",
    "มูลค่าส่วนต่าง",
    "สถานะ"
  ]);

  this.createSheet(SHEET.DIFF, [
    "SESSION_ID",
    "VERSION",
    "ST_CODE",
    "ST_NAME",
    "BUSI_PROD",
    "BUSI_NAME",
    "PRODUCT_CODE",
    "DESCRIPTION",
    "SALE_PRICE",
    "ONHAND_QTY",
    "ONHAND_AMOUNT",
    "CHECK_QTY",
    "CHECK_AMOUNT",
    "DIFF_QTY",
    "DIFF_AMOUNT",
    "STATUS",
    "REMARK",
    "COMPARE_DATE"
  ]);

  this.createSheet(SHEET.REPORT_LOCATION, [
    "LOCATION",
    "QTY",
    "S_PRICE"
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
