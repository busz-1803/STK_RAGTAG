/**
 * ==========================================================
 * STK_RAGTAG
 * GenerateMaster.gs
 * ==========================================================
 */

class GenerateMaster {

  static run() {

    try {

      Logger.info("Generate MASTER");

      const sessionId = Config.get("CURRENT_SESSION");

      Validation.required(sessionId,"Session not found.");

      const rows = this.getStock(sessionId);

      const text = this.buildText(rows);

      const file = this.save(text,sessionId);

      FileService.saveLog(
        sessionId,
        1,
        "MASTER",
        file.getName(),
        file.getId()
      );

      SpreadsheetApp.getUi().alert("MASTER Generated");

    } catch(err){

      Logger.error(err);

      SpreadsheetApp.getUi().alert(err.message);

    }

  }

}
static getStock(sessionId){

  const data = SheetService.getData(SHEET.STOCK);

  return data.filter(r=>r[0]==sessionId);

}
static buildText(rows){

  const output=[];

  rows.forEach(r=>{

    output.push([

      r[2],   // Barcode

      r[7]    // Qty

    ].join("|"));

  });

  return output.join("\r\n");

}
static save(text,sessionId){

  const folder = FileService.getFolder(
    "EXPORT_MASTER_FOLDER_ID"
  );

  const fileName =
    sessionId+".txt";

  return folder.createFile(
    fileName,
    text,
    MimeType.PLAIN_TEXT
  );

}
