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
/**
 * Import Excel File
 */
static importFile(file, sessionId){

  const rows = ExcelService.readData(file);

  if(rows.length<=1){

    throw new Error("No Data.");

  }

  Logger.info("Rows : "+rows.length);

  this.importStock(rows,sessionId);

}

};
/**
 * Import STOCK_ONHAND
 */
static importStock(rows,sessionId){

  const data=[];

  for(let i=1;i<rows.length;i++){

    const r=rows[i];

    data.push([

      sessionId,

      r[0],      // ST_CODE

      r[1],      // BARCODE

      r[2],      // SKU

      r[3],      // PRODUCT

      r[4],      // COLOR

      r[5],      // SIZE

      Number(r[6]),

      Number(r[7])

    ]);

  }

  const sh=SheetService.getSheet(SHEET.STOCK);

  sh.getRange(

    sh.getLastRow()+1,

    1,

    data.length,

    data[0].length

  ).setValues(data);

}
/**
 * Update PRODUCT MASTER
 */
static updateProduct(rows){

  const sh=SheetService.getSheet(SHEET.PRODUCT);

  const current={};

  const old=SheetService.getData(SHEET.PRODUCT);

  old.forEach(r=>{

    current[r[0]]=true;

  });

  const add=[];

  for(let i=1;i<rows.length;i++){

    const r=rows[i];

    if(current[r[1]]) continue;

    add.push([

      r[1],

      r[2],

      r[3],

      "",

      r[4],

      r[5],

      "ACTIVE"

    ]);

  }

  if(add.length){

    sh.getRange(

      sh.getLastRow()+1,

      1,

      add.length,

      add[0].length

    ).setValues(add);

  }

}
