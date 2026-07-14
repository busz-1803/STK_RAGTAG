/**
 * ==========================================================
 * SessionService.gs
 * ==========================================================
 */

class SessionService {

  /**
   * Create Session ID
   * RTG202607150001
   */
  static createSession(){

    const runningSheet =
      SheetService.getSheet(SHEET.RUNNING);

    const last =
      Number(runningSheet.getRange(2,2).getValue());

    const next = last + 1;

    runningSheet.getRange(2,2).setValue(next);

    const date =
      Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyyMMdd"
      );

    return "RTG"+date+
      ("0000"+next).slice(-4);

  }

}
