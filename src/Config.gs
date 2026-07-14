/**
 * ============================================================
 * Project : STK_RAGTAG
 * Version : 1.0.0
 * File    : Config.gs
 * Description : Read / Write System Configuration
 * ============================================================
 */

class Config {

  /**
   * SYSTEM_CONFIG Sheet
   */
  static sheet() {
    return SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET.CONFIG);
  }

  /**
   * อ่านค่า Config
   * @param {string} key
   * @returns {string}
   */
  static get(key) {

    const sh = this.sheet();

    if (!sh) throw new Error("SYSTEM_CONFIG sheet not found.");

    const data = sh.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {

      if (String(data[i][0]).trim() === key) {
        return data[i][1];
      }

    }

    return "";

  }

  /**
   * บันทึกค่า Config
   * @param {string} key
   * @param {*} value
   */
  static set(key, value) {

    const sh = this.sheet();

    if (!sh) throw new Error("SYSTEM_CONFIG sheet not found.");

    const data = sh.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {

      if (String(data[i][0]).trim() === key) {

        sh.getRange(i + 1, 2).setValue(value);

        return;

      }

    }

    sh.appendRow([key, value]);

  }

  /**
   * อ่าน Folder ID
   */
  static getFolderId(folderKey) {
    return this.get(folderKey);
  }

  /**
   * อ่าน Version
   */
  static getVersion() {
    return this.get("VERSION");
  }

  /**
   * อ่าน Company
   */
  static getCompany() {
    return this.get("COMPANY");
  }

  /**
   * อ่าน Current Session
   */
  static getSession() {
    return this.get("CURRENT_SESSION");
  }

  /**
   * อ่าน Current Store
   */
  static getStore() {
    return this.get("CURRENT_STORE");
  }
static get(key){

  const sh =
    SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET.CONFIG);

  const values =
    sh.getDataRange().getValues();

  for(let i=1;i<values.length;i++){

    if(values[i][0]===key){

      return values[i][1];

    }

  }

  return "";

}

}
