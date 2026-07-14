/**
 * ==========================================================
 * Validation.gs
 * ==========================================================
 */

class Validation {

  /**
   * Require
   */
  static required(value, message) {

    if (Helper.isEmpty(value)) {

      throw new Error(message);

    }

  }

  /**
   * Number
   */
  static number(value, message) {

    if (isNaN(Number(value))) {

      throw new Error(message);

    }

  }

  /**
   * Sheet Exists
   */
  static sheet(sheetName) {

    const sh = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(sheetName);

    if (!sh) {

      throw new Error(
        "Sheet not found : " + sheetName
      );

    }

  }

  /**
   * Folder Exists
   */
  static folder(folderId) {

    try {

      DriveApp.getFolderById(folderId);

    } catch (e) {

      throw new Error(
        "Folder not found."
      );

    }

  }

}
