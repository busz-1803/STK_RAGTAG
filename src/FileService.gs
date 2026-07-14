/**
 * ==========================================================
 * STK_RAGTAG
 * FileService.gs
 * Version 1.0.0
 * ==========================================================
 */

class FileService {

  /**
   * Get Folder By Config Key
   */
  static getFolder(configKey) {

    const folderId = Config.get(configKey);

    if (!folderId) {
      throw new Error(`Folder ID not found : ${configKey}`);
    }

    return DriveApp.getFolderById(folderId);

  }

  /**
   * Get Latest File
   */
  static getLatestFile(configKey) {

    const folder = this.getFolder(configKey);

    const files = folder.getFiles();

    let latestFile = null;
    let latestTime = 0;

    while (files.hasNext()) {

      const file = files.next();

      const time = file.getLastUpdated().getTime();

      if (time > latestTime) {

        latestTime = time;
        latestFile = file;

      }

    }

    return latestFile;

  }

  /**
   * Move File
   */
  static moveFile(fileId, targetFolderId) {

    const file = DriveApp.getFileById(fileId);

    const folder = DriveApp.getFolderById(targetFolderId);

    folder.addFile(file);

  }

  /**
   * Rename File
   */
  static rename(fileId, newName) {

    DriveApp.getFileById(fileId)
      .setName(newName);

  }

  /**
   * Delete File
   */
  static delete(fileId) {

    DriveApp.getFileById(fileId)
      .setTrashed(true);

  }

  /**
   * Save File Log
   */
  static saveLog(sessionId,
                 version,
                 fileType,
                 fileName,
                 fileId){

    SheetService.append(

      SHEET.FILE,

      [

        sessionId,

        version,

        fileType,

        fileName,

        fileId,

        new Date()

      ]

    );

  }

}
