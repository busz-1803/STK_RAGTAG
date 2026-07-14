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
