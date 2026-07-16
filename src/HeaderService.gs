class HeaderService {

  /**
   * อ่าน Header จาก Sheet
   */
  static getMap(sheetName) {

    const sheet = SheetService.getSheet(sheetName);

    const headers = sheet
      .getRange(
        1,
        1,
        1,
        sheet.getLastColumn()
      )
      .getValues()[0];

    const map = {};

    headers.forEach((header, index) => {

      const key = String(header)
        .trim()
        .toUpperCase();

      if (key) {
        map[key] = index;
      }

    });

    return map;

  }

  /**
   * ดึงค่าจาก Row ตามชื่อ Header
   */
  static get(row, map, headerName) {

    const key = String(headerName)
      .trim()
      .toUpperCase();

    if (map[key] === undefined) {
      return "";
    }

    return row[map[key]];

  }

}
