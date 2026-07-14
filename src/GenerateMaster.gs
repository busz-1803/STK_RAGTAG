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

      const rows=
DatabaseService.joinStock(sessionId);rows.forEach(r=>{

    r.barcode

    r.location

    r.qty

    r.sku

    r.productName

});

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
/**
 * Build MASTER File
 */
static buildText(rows){

  const lines=[];

  rows.sort((a,b)=>{

    if(a.location<b.location) return -1;
    if(a.location>b.location) return 1;

    return a.barcode.localeCompare(b.barcode);

  });

  rows.forEach(item=>{

    lines.push(
      this.formatLine(item)
    );

  });

  return lines.join("\r\n");

}
/**
 * Save MASTER File
 */
static save(text,sessionId){

  const folder =
    FileService.getFolder(
      "EXPORT_MASTER_FOLDER_ID"
    );

  const store =
    Config.get("CURRENT_STORE");

  const fileName =
    `${store}_${Helper.formatDate()}.txt`;

  return folder.createFile(
    fileName,
    text,
    MimeType.PLAIN_TEXT
  );

}FileService.saveLog(

    sessionId,

    1,

    "MASTER",

    file.getName(),

    file.getId()

);
/**
 * Format Master Line
 */
static formatLine(item){

  return [

    item.barcode,
    item.sku,
    item.location,
    item.qty

  ].join("|");

}
FileService.moveFile(

    file.getId(),

    Config.get("ARCHIVE_FOLDER_ID")

);
