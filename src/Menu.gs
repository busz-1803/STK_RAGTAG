/**
 * ==========================================================
 * STK_RAGTAG
 * Menu.gs
 * Version 1.0.0
 * ==========================================================
 */

/**
 * Create Menu
 */
function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu("STK_RAGTAG")

    .addItem("Install Database", "install")

    .addSeparator()

    .addItem("Import Stock", "ImportStock.run")

    .addItem("Generate Master", "GenerateMaster.run")

    .addItem("Import Handheld", "ImportHandheld.run")

    .addItem("Compare Stock", "Compare.run")

    .addSeparator()

    .addItem("Summary Report", "Summary.run")

    .addItem("Location Report", "ReportLocation.run")

    .addSeparator()

    .addItem("Export PDF", "PdfService.export")

    .addItem("Send Email", "EmailService.send")

    .addToUi();

}
