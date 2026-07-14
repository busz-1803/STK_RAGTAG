/**
 * ============================================
 * STK_RAGTAG Menu
 * ============================================
 */

/**
 * สร้างเมนูเมื่อเปิด Spreadsheet
 */
function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("📦 RAGTAG STOCK")

    .addItem("Install System", "installSystem")

    .addSeparator()

    .addItem("Import MASTER", "importMaster")
    .addItem("Import HANDHELD", "importHandheld")

    .addSeparator()

    .addItem("Generate DIFF", "generateDiff")
    .addItem("Generate LOCATION", "generateLocation")

    .addSeparator()

    .addItem("Export PDF", "exportPDF")
    .addItem("Backup Files", "backupFiles")

    .addSeparator()

    .addItem("Clear Data", "clearData")

    .addToUi();

}
function installSystem() {
  SpreadsheetApp.getUi().alert("Install System");
}

function importMaster() {
  SpreadsheetApp.getUi().alert("Import MASTER");
}

function importHandheld() {
  SpreadsheetApp.getUi().alert("Import HANDHELD");
}

function generateDiff() {
  SpreadsheetApp.getUi().alert("Generate DIFF");
}

function generateLocation() {
  SpreadsheetApp.getUi().alert("Generate LOCATION");
}

function exportPDF() {
  SpreadsheetApp.getUi().alert("Export PDF");
}

function backupFiles() {
  SpreadsheetApp.getUi().alert("Backup Files");
}

function clearData() {
  SpreadsheetApp.getUi().alert("Clear Data");
}
