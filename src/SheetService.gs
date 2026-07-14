/**
 * ==========================================================
 * STK_RAGTAG
 * SheetService.gs
 * Version 1.0.0
 * ==========================================================
 */

class SheetService {

  /**
   * Get Sheet
   */
  static getSheet(sheetName) {

    const sh = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(sheetName);

    if (!sh) {
      throw new Error(`Sheet not found : ${sheetName}`);
    }

    return sh;
  }

  /**
   * Last Row (Exclude Header)
   */
  static getLastRow(sheetName) {

    const sh = this.getSheet(sheetName);

    return Math.max(sh.getLastRow(), 1);

  }

  /**
   * Read All Data
   */
  static getData(sheetName) {

    const sh = this.getSheet(sheetName);

    const lastRow = sh.getLastRow();

    if (lastRow <= 1) return [];

    return sh
      .getRange(2,1,lastRow-1,sh.getLastColumn())
      .getValues();

  }

  /**
   * Append Row
   */
  static append(sheetName,row){

    this.getSheet(sheetName).appendRow(row);

  }

  /**
   * Clear Data (Keep Header)
   */
  static clear(sheetName){

    const sh=this.getSheet(sheetName);

    if(sh.getLastRow()>1){

      sh.getRange(
        2,
        1,
        sh.getLastRow()-1,
        sh.getLastColumn()
      ).clearContent();

    }

  }

  /**
   * Find Row by Column
   */
  static find(sheetName,columnIndex,value){

    const data=this.getData(sheetName);

    for(let i=0;i<data.length;i++){

      if(data[i][columnIndex]===value){

        return i+2;

      }

    }

    return -1;

  }

  /**
   * Update Cell
   */
  static update(sheetName,row,column,value){

    this.getSheet(sheetName)
      .getRange(row,column)
      .setValue(value);

  }

}
