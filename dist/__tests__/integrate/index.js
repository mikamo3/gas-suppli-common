"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spreadsheet_1 = require("./spreadsheet");
var testMasterdata_1 = __importDefault(require("./test/testMasterdata"));
var testRelationType_1 = __importDefault(require("./test/testRelationType"));
var testUpdateIntakes_1 = __importDefault(require("./test/testUpdateIntakes"));
var index_1 = require("constant/index");
global.prepare = function () {
    var testFolderId = "1-Jp4B5XDGThm2bjKNxqme_6_5o0Xo4S3";
    var spreadSheetName = "サプリマスタ_テスト";
    var spreadsheetId = PropertiesService.getScriptProperties().getProperty(index_1.PropertyNames.mastersheetId);
    if (spreadsheetId) {
        spreadsheet_1.deleteSpreadSheet(spreadsheetId);
        PropertiesService.getScriptProperties().setProperty(index_1.PropertyNames.mastersheetId, "");
    }
    var newSpreadsheetId = spreadsheet_1.createSpreadSheet(spreadSheetName, testFolderId);
    if (!newSpreadsheetId) {
        throw new Error("createFailed");
    }
    PropertiesService.getScriptProperties().setProperty(index_1.PropertyNames.mastersheetId, spreadsheetId);
};
global.runTest = function () {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    testMasterdata_1.default(spreadsheet);
    testRelationType_1.default(spreadsheet);
    testUpdateIntakes_1.default(spreadsheet);
    Logger.log("ok");
};
//# sourceMappingURL=index.js.map