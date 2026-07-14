static run() {

  try {

    const sessionId = Config.get("CURRENT_SESSION");

    Validation.required(
      sessionId,
      "Session not found."
    );

    const version = this.getLatestVersion(sessionId);

    const result =
      CompareService.execute(
        sessionId,
        version
      );

    this.save(result);

    SummaryService.create(
      sessionId,
      version
    );

    ReportLocationService.create(
      sessionId,
      version
    );

    SpreadsheetApp
      .getUi()
      .alert("Compare Complete");

  } catch(err){

    Logger.error(err);

    SpreadsheetApp
      .getUi()
      .alert(err.message);

  }

}
