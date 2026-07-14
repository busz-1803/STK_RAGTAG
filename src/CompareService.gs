/**
 * ==========================================================
 * STK_RAGTAG
 * CompareService.gs
 * Version 1.0.0
 * ==========================================================
 */

class CompareService {

  /**
   * Execute Compare
   */
  static execute(sessionId, version) {

    const stocks = DatabaseService.joinStock(sessionId);
    const checkMap = DatabaseService.countMap(sessionId, version);

    const result = [];

    stocks.forEach(stock => {

      const check = checkMap[stock.barcode];

      const countQty = check ? check.qty : 0;

      const diffQty = countQty - stock.qty;

      const amount = diffQty * stock.price;

      result.push({

        sessionId: sessionId,

        version: version,

        store: Config.get("CURRENT_STORE"),

        barcode: stock.barcode,

        sku: stock.sku,

        productName: stock.productName,

        color: stock.color,

        size: stock.size,

        location: stock.location,

        onhandQty: stock.qty,

        countQty: countQty,

        diffQty: diffQty,

        salePrice: stock.price,

        diffAmount: amount,

        status: this.getStatus(diffQty)

      });

    });

    return result;

  }

  /**
   * Compare Status
   */
  static getStatus(diffQty){

    if(diffQty === 0) return "MATCH";

    if(diffQty > 0) return "OVER";

    return "SHORT";

  }

}
