class Logger {

  static info(message) {

    console.log(message);

    this.audit("INFO", message);

  }

  static error(error) {

    console.error(error);

    this.audit("ERROR", error.toString());

  }

  static audit(action, message) {

    try {

      SheetService.append(

        SHEET.AUDIT,

        [

          new Date(),

          Session.getActiveUser().getEmail(),

          action,

          "",

          APP.VERSION,

          "SUCCESS",

          message

        ]

      );

    } catch (e) {

      console.error(e);

    }

  }

}
