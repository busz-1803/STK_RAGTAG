/**
 * ==========================================================
 * STK_RAGTAG
 * ImportStock.gs
 * Version 1.0.0
 * ==========================================================
 */

class ImportStock {

  /**
   * Main Process
   */
  static run() {

    try {

      Logger.log("=== IMPORT STOCK START ===");

      const file = this.getLatestFile();

      if (!file) {
        throw new Error("No Excel file found.");
      }

      const sessionId = SessionService.createSession();

      Logger.log("Session : " + sessionId);

      this.importFile(file, sessionId);

      this.createSession(sessionId);

      Logger.log("=== IMPORT COMPLETE ===");

      SpreadsheetApp.getUi().alert(
        "Import Stock Complete"
      );

    } catch (err) {

      Logger.error(err);

      SpreadsheetApp.getUi().alert(err.message);

    }

  }

  /**
   * Get Latest Excel File
   */
  static getLatestFile() {

    const folderId =
      Config.get("IMPORT_STOCK_FOLDER_ID");

    const folder =
      DriveApp.getFolderById(folderId);

    const files = folder.getFiles();

    let latest = null;

    while (files.hasNext()) {

      latest = files.next();

    }

    return latest;

  }

}
