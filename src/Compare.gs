/**
 * ==========================================================
 * STK_RAGTAG
 * Compare.gs
 * ==========================================================
 */

class Compare {

  static run() {

    try {

      Logger.info("Compare Stock");

      const sessionId = Config.get("CURRENT_SESSION");

      Validation.required(sessionId, "Session not found.");

      const version = this.getLatestVersion(sessionId);

      const result = this.compare(sessionId, version);

      this.save(result);

      SpreadsheetApp.getUi().alert(
        "Compare Complete : " + result.length + " SKU"
      );

    } catch (err) {

      Logger.error(err);

      SpreadsheetApp.getUi().alert(err.message);

    }

  }

}
static getLatestVersion(sessionId){

  const rows = DatabaseService.table(SHEET.CHECK);

  let version = 0;

  rows.forEach(r=>{

    if(r[0]==sessionId){

      version=Math.max(version,Number(r[1]));

    }

  });

  return version;

}
static compare(sessionId,version){

  const stocks =
      DatabaseService.joinStock(sessionId);

  const checks =
      DatabaseService.table(SHEET.CHECK);

  const map = {};

  checks.forEach(r=>{

    if(r[0]!=sessionId) return;

    if(r[1]!=version) return;

    map[r[4]] = r;

  });

  const result=[];

  stocks.forEach(stock=>{

    const check = map[stock.barcode];

    const count = check
      ? Number(check[5])
      : 0;

    const diff = count-stock.qty;

    result.push({

      sessionId,

      version,

      barcode:stock.barcode,

      sku:stock.sku,

      product:stock.productName,

      location:stock.location,

      onhand:stock.qty,

      count,

      diff,

      price:stock.price,

      amount:diff*stock.price

    });

  });

  return result;

}
static save(rows){

  const sh =
      SheetService.getSheet(SHEET.DIFF);

  SheetService.clear(SHEET.DIFF);

  const data=[];

  rows.forEach(r=>{

    data.push([

      r.sessionId,

      r.version,

      Config.get("CURRENT_STORE"),

      r.location,

      r.barcode,

      r.sku,

      r.product,

      "",

      "",

      r.onhand,

      r.count,

      r.diff,

      r.price,

      r.amount,

      this.status(r.diff)

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
static status(diff){

  if(diff==0) return "MATCH";

  if(diff>0) return "OVER";

  return "SHORT";

}
