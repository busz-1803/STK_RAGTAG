/**
 * ==========================================================
 * STK_RAGTAG
 * DatabaseService.gs
 * Version 1.0.0
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

}
/**
 * Find Product By Barcode
 */
static findProduct(barcode){

  const products=this.products();

  return products.find(r=>r[0]==barcode)||null;

}
/**
 * Find Shelf
 */
static findLocation(barcode){

  const rows=this.locations();

  return rows.find(r=>r[0]==barcode)||null;

}
/**
 * Find Stock
 */
static findStock(sessionId,barcode){

  const rows=this.stocks();

  return rows.find(r=>

    r[0]==sessionId &&

    r[2]==barcode

  )||null;

}
/**
 * Join Product + Stock + Location
 */
static joinStock(sessionId){

  const stocks=this.stocks();

  const result=[];

  stocks.forEach(stock=>{

    if(stock[0]!=sessionId) return;

    const barcode=stock[2];

    const product=this.findProduct(barcode);

    const location=this.findLocation(barcode);

    result.push({

      sessionId,

      barcode,

      sku:product?product[1]:"",

      productName:product?product[2]:"",

      color:product?product[4]:"",

      size:product?product[5]:"",

      location:location?location[1]:"",

      qty:stock[7],

      price:stock[8]

    });

  });

  return result;

}
