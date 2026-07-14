/**
 * ==========================================================
 * DriveService.gs
 * ==========================================================
 */

class DriveService {

  static createRootFolder() {

    const rootName = APP.NAME;

    const folders = DriveApp.getFoldersByName(rootName);

    let root;

    if (folders.hasNext()) {

      root = folders.next();

    } else {

      root = DriveApp.createFolder(rootName);

    }

    this.saveConfig("ROOT_FOLDER_ID", root.getId());

    this.createSubFolder(root,"01_IMPORT_STOCK","IMPORT_STOCK_FOLDER_ID");

    this.createSubFolder(root,"02_EXPORT_MASTER","EXPORT_MASTER_FOLDER_ID");

    this.createSubFolder(root,"03_IMPORT_HANDHELD","IMPORT_HANDHELD_FOLDER_ID");

    this.createSubFolder(root,"04_EXPORT_PDF","EXPORT_PDF_FOLDER_ID");

    this.createSubFolder(root,"05_EMAIL","EMAIL_FOLDER_ID");

    this.createSubFolder(root,"06_BACKUP","BACKUP_FOLDER_ID");

    this.createSubFolder(root,"07_ARCHIVE","ARCHIVE_FOLDER_ID");

  }

  static createSubFolder(parent,name,key){

    const folders = parent.getFoldersByName(name);

    let folder;

    if(folders.hasNext()){

      folder = folders.next();

    }else{

      folder = parent.createFolder(name);

    }

    this.saveConfig(key,folder.getId());

  }

  static saveConfig(key,value){

    const sh = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET.CONFIG);

    const values = sh.getDataRange().getValues();

    for(let i=1;i<values.length;i++){

      if(values[i][0]===key){

        sh.getRange(i+1,2).setValue(value);

        return;

      }

    }

  }

}
