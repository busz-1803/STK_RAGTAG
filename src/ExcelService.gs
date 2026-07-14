/**
 * ==========================================================
 * STK_RAGTAG
 * ExcelService.gs
 * Version 1.0.0
 * ==========================================================
 */

class ExcelService {

  /**
   * Convert Excel → Google Sheet
   */
  static convertExcel(file) {

    const blob = file.getBlob();

    const resource = {
      title: file.getName(),
      mimeType: MimeType.GOOGLE_SHEETS
    };

    const newFile = Drive.Files.insert(resource, blob, {
      convert: true
    });

    return SpreadsheetApp.openById(newFile.id);

  }

  /**
   * Read First Sheet
   */
  static getSheet(ss) {

    return ss.getSheets()[0];

  }

  /**
   * Read All Rows
   */
  static readData(file) {

    const ss = this.convertExcel(file);

    const sh = this.getSheet(ss);

    return sh.getDataRange().getValues();

  }

  /**
   * Delete Temp Sheet
   */
  static removeTemp(ss){

    DriveApp.getFileById(ss.getId())
      .setTrashed(true);

  }

}
