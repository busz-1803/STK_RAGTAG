/**
 * ===========================================================
 * STK_RAGTAG
 * Version : 1.0.0
 * File : Config.gs
 * Description : Read / Write SYSTEM_CONFIG
 * ===========================================================
 */

class Config {

  static getSheet() {
    return SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET.CONFIG);
  }

  static get(key) {

    const sh = this.getSheet();

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (values[i][0] == key) {

        return values[i][1];

      }

    }

    return "";

  }

  static set(key, value) {

    const sh = this.getSheet();

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (values[i][0] == key) {

        sh.getRange(i + 1, 2).setValue(value);

        return;

      }

    }

    sh.appendRow([key, value]);

  }

}
