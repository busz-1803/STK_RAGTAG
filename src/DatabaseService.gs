/**
 * ==========================================================
 * STK_RAGTAG
 * DatabaseService.gs
 * Version 1.1.0
 * ==========================================================
 */

class DatabaseService {

  /**
   * Read Table
   */
  static table(sheetName) {
    return SheetService.getData(sheetName);
  }

  /**
   * PRODUCT_MASTER
   */
  static products() {
    return this.table(SHEET.PRODUCT);
  }

  /**
   * STOCK_ONHAND
   */
  static stocks() {
    return this.table(SHEET.STOCK);
  }

  /**
   * LOCATION_MASTER
   */
  static locations() {
    return this.table(SHEET.LOCATION);
  }

  /**
   * STORE_MASTER
   */
  static stores() {
    return this.table(SHEET.STORE);
  }

  /**
   * SESSION_MASTER
   */
  static sessions() {
    return this.table(SHEET.SESSION);
  }

  /**
   * CHECK_STOCK
   */
  static checks() {
    return this.table(SHEET.CHECK);
  }

  /**
   * Find Product
   */
  static findProduct(barcode) {

    return this.products().find(r =>
      Helper.barcode(r[0]) == Helper.barcode(barcode)
    ) || null;

  }

  /**
   * Find Location
   */
  static findLocation(barcode) {

    return this.locations().find(r =>
      Helper.barcode(r[0]) == Helper.barcode(barcode)
    ) || null;

  }

  /**
   * Find Stock
   */
  static findStock(sessionId, barcode) {

    return this.stocks().find(r =>

      r[0] == sessionId &&
      Helper.barcode(r[2]) == Helper.barcode(barcode)

    ) || null;

  }

  /**
   * Join Stock + Product + Location
   */
  static joinStock(sessionId) {

    const stocks = this.stocks();
    const result = [];

    stocks.forEach(stock => {

      if (stock[0] != sessionId) return;

      const barcode = Helper.barcode(stock[2]);

      const product = this.findProduct(barcode);

      const location = this.findLocation(barcode);

      result.push({

        sessionId: sessionId,

        barcode: barcode,

        sku: product ? product[1] : "",

        productName: product ? product[2] : "",

        color: product ? product[4] : "",

        size: product ? product[5] : "",

        location: location ? location[1] : "",

        qty: Helper.toNumber(stock[7]),

        price: Helper.toNumber(stock[8])

      });

    });

    return result;

  }

  /**
   * Group Count By Barcode
   */
  static countMap(sessionId, version) {

    const map = {};

    this.checks().forEach(r => {

      if (r[0] != sessionId) return;

      if (Number(r[1]) != Number(version)) return;

      const barcode = Helper.barcode(r[4]);

      if (!map[barcode]) {

        map[barcode] = {

          qty: 0,

          locations: {}

        };

      }

      const qty = Helper.toNumber(r[5]);

      map[barcode].qty += qty;

      const location = r[3];

      if (!map[barcode].locations[location]) {

        map[barcode].locations[location] = 0;

      }

      map[barcode].locations[location] += qty;

    });

    return map;

  }

}
