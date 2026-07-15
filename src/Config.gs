class Config {

  static sheet() {
    return SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET.CONFIG);
  }

  static get(key) {

    const sh = this.sheet();

    if (!sh) {
      throw new Error("SYSTEM_CONFIG sheet not found.");
    }

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (String(values[i][0]).trim() === String(key).trim()) {
        return values[i][1];
      }

    }

    return "";

  }

  static set(key, value) {

    const sh = this.sheet();

    if (!sh) {
      throw new Error("SYSTEM_CONFIG sheet not found.");
    }

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (String(values[i][0]).trim() === String(key).trim()) {

        sh.getRange(i + 1, 2).setValue(value);
        return;

      }

    }

    sh.appendRow([key, value]);

  }

  static getFolderId(folderKey) {
    return this.get(folderKey);
  }

  static getVersion() {
    return this.get("VERSION");
  }

  static getCompany() {
    return this.get("COMPANY");
  }

  static getSession() {
    return this.get("CURRENT_SESSION");
  }

  static getStore() {
    return this.get("CURRENT_STORE");
  }

}
