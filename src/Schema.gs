/**
 * ============================================
 * STK_RAGTAG Schema
 * ============================================
 */

/**
 * สร้าง Sheet ถ้ายังไม่มี
 */
function createSheetIfNotExists(sheetName, headers) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {

    sheet = ss.insertSheet(sheetName);

    if (headers && headers.length > 0) {

      sheet.getRange(1, 1, 1, headers.length)
        .setValues([headers]);

      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#00ff00");

    }

  }

  return sheet;

}
/**
 * สร้างทุก Sheet ของระบบ
 */
function createSystemSheets() {

  createSheetIfNotExists(CONFIG.SHEET.CONFIG);

  createSheetIfNotExists(
    CONFIG.SHEET.MASTER,
    HEADERS.MASTER
  );

  createSheetIfNotExists(
    CONFIG.SHEET.HANDHELD,
    HEADERS.HANDHELD
  );

  createSheetIfNotExists(
    CONFIG.SHEET.DIFF,
    HEADERS.DIFF
  );

  createSheetIfNotExists(
    CONFIG.SHEET.LOCATION,
    HEADERS.LOCATION
  );

  createSheetIfNotExists(CONFIG.SHEET.SUMMARY);

  createSheetIfNotExists(CONFIG.SHEET.LOG);

}
