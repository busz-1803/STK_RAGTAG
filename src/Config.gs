/*************************************************
 * STK_RAGTAG CONFIG
 *************************************************/

const CONFIG = {

  // Main Spreadsheet
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId(),

  // Folder
  FOLDER_MASTER: "MASTER_HANDHELD",
  FOLDER_IMPORT: "IMPORT",
  FOLDER_EXPORT: "EXPORT",
  FOLDER_BACKUP: "BACKUP",
  FOLDER_REPORT: "REPORT",

  // Mail
  MAIL_TO: "your@email.com",

  // Company
  COMPANY: "RAGTAG",

  // Version
  VERSION: "1.0.0"

};


/*************************************************
 * Sheet Name
 *************************************************/

const SHEET = {

  STORE: "STORE_MASTER",
  PRODUCT: "PRODUCT_MASTER",
  LOCATION: "LOCATION_MASTER",

  STOCK: "STOCK_ONHAND",

  COUNT_HEADER: "COUNT_HEADER",
  COUNT_DETAIL: "COUNT_DETAIL",

  USER: "USER_MASTER",

  LOG: "LOG"

};


/*************************************************
 * Status
 *************************************************/

const STATUS = {

  OPEN: "OPEN",
  COUNTING: "COUNTING",
  CLOSED: "CLOSED"

};
