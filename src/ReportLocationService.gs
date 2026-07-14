class ReportLocationService {

  static create(sessionId,version){

    const diff =
      DatabaseService.table(
        SHEET.DIFF
      );

    const report = {};

    diff.forEach(r=>{

      if(r[0]!=sessionId) return;

      if(Number(r[1])!=Number(version)) return;

      const shelf = r[3];

      if(!report[shelf]){

        report[shelf]={

          sku:0,

          onhand:0,

          count:0,

          diff:0,

          amount:0

        };

      }

      report[shelf].sku++;

      report[shelf].onhand+=Helper.toNumber(r[9]);

      report[shelf].count+=Helper.toNumber(r[10]);

      report[shelf].diff+=Helper.toNumber(r[11]);

      report[shelf].amount+=Helper.toNumber(r[13]);

    });

    return report;

  }

}
