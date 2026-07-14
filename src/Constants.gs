/**
 * ============================================
 * STK_RAGTAG Constants
 * ============================================
 */

const HEADERS = {

  MASTER: [
    "ENDING_DATE",
    "ST_CODE",
    "ST_NAME",
    "BUSI_PROD",
    "BUSI_NAME",
    "PROD_CODE",
    "BARCODE",
    "STOCK_ONHAND",
    "SALE_PRICE",
    "DESCRIPTION"
  ],

  HANDHELD: [
    "ST_CODE",
    "BUSI_PROD",
    "PROD_CODE",
    "QTY",
    "PRICE",
    "S_PRICE",
    "BAR_CODE",
    "CHK_DAT",
    "CHK_TYPE",
    "HAND_CODE",
    "LOCATION",
    "CORNER",
    "CATEGORY",
    "PBILL",
    "DESCRIPTION"
  ],

  DIFF: [
    "PROD_CODE",
    "BARCODE",
    "MASTER_QTY",
    "COUNT_QTY",
    "DIFF",
    "PRICE",
    "DESCRIPTION"
  ],

  LOCATION: [
    "LOCATION",
    "QTY",
    "TOTAL_PRICE"
  ]

};

const STATUS = {

  SUCCESS: "SUCCESS",

  ERROR: "ERROR",

  WARNING: "WARNING",

  INFO: "INFO"

};
