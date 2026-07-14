/**
 * ==========================================================
 * STK_RAGTAG
 * ImportHandheld.gs
 * ==========================================================
 */

class ImportHandheld {

  static run() {

    try {

      Logger.info("Import Handheld");

      const file = FileService.getLatestFile(
        "IMPORT_HANDHELD_FOLDER_ID"
      );

      if (!file) {
        throw new Error("Handheld file not found.");
      }

      const text = file.getBlob().getDataAsString("UTF-8");

      const rows = this.parse(text);

      const sessionId = Config.get("CURRENT_SESSION");

      const version = this.getNextVersion(sessionId);

      this.saveCheck(rows, sessionId, version);

      this.updateLocation(rows);

      FileService.saveLog(
        sessionId,
        version,
        "HANDHELD",
        file.getName(),
        file.getId()
      );

      SpreadsheetApp.getUi().alert("Import Complete");

    } catch(err){

      Logger.error(err);

      SpreadsheetApp.getUi().alert(err.message);

    }

  }

}
static parse(text){

  const lines = text.split(/\r?\n/);

  const data = [];

  lines.forEach(line=>{

    if(line.trim()=="") return;

    data.push(line.split("|"));

  });

  return data;

}
static getNextVersion(sessionId){

  const rows = SheetService.getData(SHEET.CHECK);

  let version = 0;

  rows.forEach(r=>{

    if(r[0]==sessionId){

      version = Math.max(version, Number(r[1]));

    }

  });

  return version + 1;

}
static saveCheck(rows, sessionId, version){

  const sh = SheetService.getSheet(SHEET.CHECK);

  const data = [];

  rows.forEach(r=>{

    data.push([

      sessionId,
      version,
      Config.get("CURRENT_STORE"),

      r[2],      // LOCATION

      r[0],      // BARCODE

      Helper.toNumber(r[3]),

      new Date()

    ]);

  });

  if(data.length){

    sh.getRange(

      sh.getLastRow()+1,

      1,

      data.length,

      data[0].length

    ).setValues(data);

  }

}
static updateLocation(rows){

  const sh = SheetService.getSheet(SHEET.LOCATION);

  const old = DatabaseService.locations();

  const map = {};

  old.forEach(r=>{

    map[r[0]] = true;

  });

  const add = [];

  rows.forEach(r=>{

    if(map[r[0]]) return;

    add.push([

      r[0],   // BARCODE

      r[2]    // LOCATION

    ]);

  });

  if(add.length){

    sh.getRange(

      sh.getLastRow()+1,

      1,

      add.length,

      add[0].length

    ).setValues(add);

  }

}
