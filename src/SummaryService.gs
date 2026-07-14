/**
 * ==========================================================
 * STK_RAGTAG
 * SummaryService.gs
 * ==========================================================
 */

class SummaryService {

  /**
   * Create Summary
   */
  static create(sessionId, version) {

    const diffRows = DatabaseService.table(SHEET.DIFF);

    const summary = {

      totalSKU: 0,

      match: 0,

      over: 0,

      short: 0,

      unknown: 0,

      onhandQty: 0,

      countQty: 0,

      diffQty: 0,

      diffAmount: 0

    };

    diffRows.forEach(r => {

      if (r[0] != sessionId) return;
      if (Number(r[1]) != Number(version)) return;

      summary.totalSKU++;

      const onhand = Helper.toNumber(r[9]);
      const count = Helper.toNumber(r[10]);
      const diff = Helper.toNumber(r[11]);
      const amount = Helper.toNumber(r[13]);
      const status = r[14];

      summary.onhandQty += onhand;
      summary.countQty += count;
      summary.diffQty += diff;
      summary.diffAmount += amount;

      switch(status){

        case "MATCH":
          summary.match++;
          break;

        case "OVER":
          summary.over++;
          break;

        case "SHORT":
          summary.short++;
          break;

        default:
          summary.unknown++;
      }

    });

    return summary;

  }

}
