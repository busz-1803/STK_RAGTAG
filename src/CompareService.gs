/**
 * ==========================================================
 * STK_RAGTAG
 * CompareService.gs
 * Version 1.1.0
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

      const countQty = check ? Helper.toNumber(check.qty) : 0;

      const onhandQty = Helper.toNumber(stock.qty);

      const salePrice = Helper.toNumber(stock.price);

      const diffQty = countQty - onhandQty;

      const diffAmount = Number(
        (diffQty * salePrice).toFixed(2)
      );

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

        onhandQty: onhandQty,

        countQty: countQty,

        diffQty: diffQty,

        salePrice: salePrice,

        diffAmount: diffAmount,

        status: this.getStatus(
          onhandQty,
          countQty
        ),

        remark: "",

        compareDate: new Date()

      });

    });

    return result;

  }

  /**
   * Compare Status
   */
  static getStatus(onhandQty, countQty) {

    if (onhandQty === 0 && countQty > 0) {
      return "UNKNOWN";
    }

    if (onhandQty > 0 && countQty === 0) {
      return "MISSING";
    }

    if (countQty === onhandQty) {
      return "MATCH";
    }

    if (countQty > onhandQty) {
      return "OVER";
    }

    return "SHORT";

  }

}
