"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spreadsheet_1 = require("./spreadsheet");
var testMasterdata_1 = __importDefault(require("./test/testMasterdata"));
var testRelationType_1 = __importDefault(require("./test/testRelationType"));
var testUpdateIntakes_1 = __importDefault(require("./test/testUpdateIntakes"));
global.prepare = function () {
    var testFolderId = "1-Jp4B5XDGThm2bjKNxqme_6_5o0Xo4S3";
    var spreadSheetName = "サプリマスタ_テスト";
    var testSpreadSheetId = PropertiesService.getScriptProperties().getProperty("testSpreadSheetId");
    if (testSpreadSheetId) {
        spreadsheet_1.deleteSpreadSheet(testSpreadSheetId);
        PropertiesService.getScriptProperties().setProperty("testSpreadSheetId", "");
    }
    var spreadsheetId = spreadsheet_1.createSpreadSheet(spreadSheetName, testFolderId);
    if (!spreadsheetId) {
        throw new Error("createFailed");
    }
    PropertiesService.getScriptProperties().setProperty("testSpreadSheetId", spreadsheetId);
};
global.runTest = function () {
    var testSpreadSheetId = PropertiesService.getScriptProperties().getProperty("testSpreadSheetId");
    if (!testSpreadSheetId) {
        throw new Error("spreadSheet does not exist");
    }
    var spreadsheet = SpreadsheetApp.openById(testSpreadSheetId);
    testMasterdata_1.default(spreadsheet);
    testRelationType_1.default(spreadsheet);
    testUpdateIntakes_1.default(spreadsheet);
    Logger.log("ok");
};
//# sourceMappingURL=index.js.map