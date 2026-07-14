/**
 * Create Sheet
 * @param {String} sheetName
 * @param {Array} headers
 */
static createSheet(sheetName, headers) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

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
    .setFontColor("white")
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
 * Create Default System Config
 */
static createSystemConfig() {

  const sh = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET.CONFIG);

  const data = [

    ["KEY","VALUE"],

    ["VERSION", APP.VERSION],
    ["COMPANY", APP.COMPANY],

    ["ROOT_FOLDER_ID",""],

    ["IMPORT_STOCK_FOLDER_ID",""],
    ["EXPORT_MASTER_FOLDER_ID",""],
    ["IMPORT_HANDHELD_FOLDER_ID",""],
    ["EXPORT_PDF_FOLDER_ID",""],
    ["EMAIL_FOLDER_ID",""],
    ["BACKUP_FOLDER_ID",""],
    ["ARCHIVE_FOLDER_ID",""],

    ["CURRENT_SESSION",""],
    ["CURRENT_STORE",""],

    ["DEFAULT_EMAIL",""],

    ["PDF_PAPER","A4"],
    ["TEXT_ENCODING","UTF-8"],
    ["DATE_FORMAT","yyyyMMdd"],

    ["SYSTEM_STATUS","READY"]

  ];

  sh.clearContents();

  sh.getRange(1,1,data.length,2).setValues(data);

  this.setHeaderStyle(sh,2);

}
/**
 * Initialize Running Number
 */
static createRunningNo() {

  const sh = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET.RUNNING);

  sh.clearContents();

  sh.getRange(1,1,2,2).setValues([

    ["PREFIX","LAST_NO"],

    ["RTG",0]

  ]);

  this.setHeaderStyle(sh,2);

}
/**
 * Install Database
 */
static initialize() {

  this.createAllSheets();

  this.createSystemConfig();

  this.createRunningNo();

}
/**
 * Install System
 */
static install() {

  this.initialize();

  SpreadsheetApp.getUi().alert(

    "Database Created Successfully."

  );

}
/**
 * Apply Default Format
 */
static formatSheet(sheet) {

  const lastColumn = sheet.getLastColumn();

  if (lastColumn === 0) return;

  sheet.getRange(1, 1, 1, lastColumn)
    .setFontWeight("bold")
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF")
    .setHorizontalAlignment("center");

  sheet.setFrozenRows(1);

  sheet.setRowHeight(1, 28);

  sheet.autoResizeColumns(1, lastColumn);

}
/**
 * Protect System Sheets
 */
static protectSheets() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const protectList = [
    SHEET.CONFIG,
    SHEET.RUNNING
  ];

  protectList.forEach(name => {

    const sh = ss.getSheetByName(name);

    if (!sh) return;

    const protection = sh.protect();

    protection.setDescription("System Protected");

    protection.setWarningOnly(true);

  });

}
/**
 * Hide Internal Sheets
 */
static hideSheets() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  [
    SHEET.CONFIG,
    SHEET.RUNNING,
    SHEET.AUDIT,
    SHEET.FILE,
    SHEET.EMAIL
  ].forEach(name => {

    const sh = ss.getSheetByName(name);

    if (sh) {

      sh.hideSheet();

    }

  });

}
/**
 * Create First Audit
 */
static createAudit() {

  const sh = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET.AUDIT);

  sh.appendRow([

    new Date(),

    Session.getActiveUser().getEmail(),

    "INSTALL",

    "",

    "1.0.0",

    "SUCCESS",

    "Database Initialized"

  ]);

}
/**
 * Install Database
 */
static initialize() {

  this.createAllSheets();

  this.createSystemConfig();

  this.createRunningNo();

  this.protectSheets();

  this.hideSheets();

  this.createAudit();

}
/**
 * Database Version
 */
static getVersion() {

  return APP.VERSION;

}
this.createSheet(SHEET.SUMMARY,[

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
