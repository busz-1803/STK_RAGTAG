/**
 * ==========================================================
 * STK_RAGTAG
 * Install.gs
 * Version 1.0.0
 * ==========================================================
 */

class Install {

  /**
   * Install System
   */
  static run() {

    try {

      SpreadsheetApp.getActive().toast("Creating Database...");

      Schema.initialize();

      SpreadsheetApp.getActive().toast("Creating Drive Structure...");

      DriveService.createRootFolder();

      SpreadsheetApp.getActive().toast("Complete");

      SpreadsheetApp.getUi().alert(
        "STK_RAGTAG Installed Successfully"
      );

    } catch (err) {

      SpreadsheetApp.getUi().alert(err);

      Logger.error(err);

    }

  }

}
