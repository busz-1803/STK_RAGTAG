/**
 * ==========================================================
 * STK_RAGTAG
 * Helper.gs
 * Version 1.0.0
 * ==========================================================
 */

class Helper {

  /**
   * Format Date
   */
  static formatDate(date = new Date()) {

    return Utilities.formatDate(
      date,
      Session.getScriptTimeZone(),
      APP.DATE_FORMAT
    );

  }

  /**
   * Format Date Time
   */
  static formatDateTime(date = new Date()) {

    return Utilities.formatDate(
      date,
      Session.getScriptTimeZone(),
      APP.DATETIME_FORMAT
    );

  }

  /**
   * Generate UUID
   */
  static uuid() {

    return Utilities.getUuid();

  }

  /**
   * Convert Null
   */
  static nvl(value, defaultValue = "") {

    if (value === null || value === undefined) {
      return defaultValue;
    }

    return value;

  }

  /**
   * Convert Number
   */
  static toNumber(value) {

    if (value === "" || value === null) {
      return 0;
    }

    return Number(value);

  }

  /**
   * Trim
   */
  static trim(value) {

    return String(value).trim();

  }

  /**
   * Barcode Normalize
   */
  static barcode(value) {

    return String(value).trim().replace(/\s/g, "");

  }

  /**
   * Is Empty
   */
  static isEmpty(value) {

    return value === "" ||
           value === null ||
           value === undefined;

  }

}
