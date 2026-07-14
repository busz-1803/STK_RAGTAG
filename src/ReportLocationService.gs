/**
 * ==========================================================
 * ReportLocationService.gs
 * ==========================================================
 */

class ReportLocationService {

  /**
   * Generate Report
   */
  static create(sessionId, version) {

    const diff = DatabaseService.table(SHEET.DIFF);

    const map = {};

    diff.forEach(r => {

      if (r[0] != sessionId) return;
      if (Number(r[1]) != Number(version)) return;

      const location = r[3];

      if (!map[location]) {

        map[location] = {

          location,

          sku: 0,

          onhand: 0,

          count: 0,

          diff: 0,

          amount: 0,

          match: 0,

          over: 0,

          short: 0

        };

      }

      const obj = map[location];

      obj.sku++;

      obj.onhand += Helper.toNumber(r[9]);

      obj.count += Helper.toNumber(r[10]);

      obj.diff += Helper.toNumber(r[11]);

      obj.amount += Helper.toNumber(r[13]);

      switch(r[14]){

        case "MATCH":
          obj.match++;
          break;

        case "OVER":
          obj.over++;
          break;

        case "SHORT":
          obj.short++;
          break;

      }

    });

    this.save(sessionId,version,Object.values(map));

  }
  static save(sessionId,version,rows){

    const sh =
      SheetService.getSheet(
        SHEET.REPORT_LOCATION
      );

    SheetService.clear(
      SHEET.REPORT_LOCATION
    );

    const data=[];

    rows.sort((a,b)=>
      a.location.localeCompare(b.location)
    );

    rows.forEach(r=>{

      data.push([

        sessionId,

        version,

        Config.get("CURRENT_STORE"),

        r.location,

        r.sku,

        r.onhand,

        r.count,

        r.diff,

        r.amount,

        r.match,

        r.over,

        r.short,

        new Date()

      ]);

    });

    if(data.length){

      sh.getRange(

        2,

        1,

        data.length,

        data[0].length

      ).setValues(data);

    }

  }

}
