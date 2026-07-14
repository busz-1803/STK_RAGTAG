/**
 * ==========================================================
 * Menu.gs
 * ==========================================================
 */

function onOpen(){

  Menu.create();

}

class Menu{

  static create(){

    SpreadsheetApp.getUi()

    .createMenu("📦 STK RAGTAG")

    .addItem("Install System","menuInstall")

    .addSeparator()

    .addItem("Import Stock","menuImportStock")

    function menuGenerateMaster(){

    GenerateMaster.run();

}

    .addItem("Import Handheld","menuImportHandheld")

    .addItem("Compare Stock","menuCompare")

    .addSeparator()

    .addItem("Generate PDF","menuPdf")

    .addItem("Send Email","menuEmail")

    .addToUi();

  }

}

function menuInstall(){

  Install.run();

}

function menuImportStock(){

  ImportStock.run();

}

function menuGenerateMaster(){}

function menuImportHandheld(){}

function menuCompare(){}

function menuPdf(){}

function menuEmail(){}
