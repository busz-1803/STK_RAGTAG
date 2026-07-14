/**
 * ============================================================
 * Project : STK_RAGTAG
 * Version : 1.0.0
 * File    : Schema.gs
 * Description : Create Google Sheets Structure
 * ============================================================
 */

class Schema {

  static createAllSheets() {

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const schemas = [

      {
        name: SHEET.CONFIG,
        headers: [
          "KEY",
          "VALUE"
        ]
      },

      {
        name: SHEET.STORE,
        headers: [
          "ST_CODE",
          "ST_NAME",
          "STATUS"
        ]
      },

      {
        name: SHEET.PRODUCT,
        headers: [
          "BARCODE",
          "PROD_CODE",
          "DESCRIPTION",
          "BRAND",
          "COLOR",
          "SIZE",
          "STATUS"
        ]
      },

      {
        name: "SESSION_MASTER",
        headers: [
          "SESSION_ID",
          "ST_CODE",
          "ST_NAME",
          "STOCK_DATE",
          "VERSION",
          "STATUS",
          "CREATE_DATE",
          "CREATE_BY"
        ]
      },

      {
        name: SHEET.STOCK,
        headers: [
          "SESSION_ID",
          "ST_CODE",
          "BARCODE",
          "PROD_CODE",
          "DESCRIPTION",
          "ONHAND_QTY",
          "SALE_PRICE"
        ]
      },

      {
        name: SHEET.CHECK,
        headers: [
          "SESSION_ID",
          "ST_CODE",
          "LOCATION",
          "BARCODE",
          "COUNT_QTY",
          "IMPORT_DATE"
        ]
      },

      {
        name: SHEET.DIFF,
        headers: [
          "SESSION_ID",
          "ST_CODE",
          "LOCATION",
          "BARCODE",
          "ONHAND_QTY",
          "COUNT_QTY",
          "DIFF_QTY"
        ]
      },

      {
        name: SHEET.HEADER,
        headers: [
          "SESSION_ID",
          "REPORT_NAME",
          "STORE",
          "DATE"
        ]
      },

      {
        name: SHEET.LOCATION,
        headers: [
          "SESSION_ID",
          "LOCATION",
          "SKU",
          "ONHAND_QTY",
          "COUNT_QTY",
          "DIFF_QTY"
        ]
      },

      {
        name: SHEET.SIGNATURE,
        headers: [
          "SESSION_ID",
          "DOC_TYPE",
          "SIGN_ROLE",
          "SIGN_NAME",
          "SIGN_IMAGE",
          "SIGN_DATE"
        ]
      },

      {
        name: SHEET.AUDIT,
        headers: [
          "LOG_TIME",
          "USER",
          "ACTION",
          "SESSION_ID",
          "RESULT",
          "MESSAGE"
        ]
      },

      {
        name: SHEET.RUNNING,
        headers: [
          "PREFIX",
          "LAST_NO"
        ]
      },

      {
        name: SHEET.EMAIL,
        headers: [
          "SESSION_ID",
          "EMAIL_TO",
          "SUBJECT",
          "SEND_TIME",
          "STATUS"
        ]
      },

      {
        name: "FILE_LOG",
        headers: [
          "SESSION_ID",
          "FILE_TYPE",
          "FILE_NAME",
          "FILE_ID",
          "VERSION",
          "CREATE_DATE"
        ]
      }

    ];

    schemas.forEach(schema => {

      let sh = ss.getSheetByName(schema.name);

      if (!sh) {

        sh = ss.insertSheet(schema.name);

      } else {

        sh.clear();

      }

      sh.getRange(1, 1, 1, schema.headers.length)
        .setValues([schema.headers]);

      sh.getRange(1, 1, 1, schema.headers.length)
        .setFontWeight("bold");

      sh.setFrozenRows(1);

      sh.autoResizeColumns(1, schema.headers.length);

    });

  }

}
