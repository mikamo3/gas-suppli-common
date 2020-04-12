import { deleteSpreadSheet, createSpreadSheet } from "./spreadsheet";
import testMasterdata from "./test/testMasterdata";
import testRelationType from "./test/testRelationType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;
global.prepare = () => {
  const testFolderId = "1-Jp4B5XDGThm2bjKNxqme_6_5o0Xo4S3";
  const spreadSheetName = "サプリマスタ_テスト";
  const testSpreadSheetId = PropertiesService.getScriptProperties().getProperty(
    "testSpreadSheetId"
  );
  if (testSpreadSheetId) {
    deleteSpreadSheet(testSpreadSheetId);
    PropertiesService.getScriptProperties().setProperty("testSpreadSheetId", "");
  }
  const spreadsheetId = createSpreadSheet(spreadSheetName, testFolderId);
  PropertiesService.getScriptProperties().setProperty("testSpreadSheetId", spreadsheetId);
};
global.runTest = () => {
  const testSpreadSheetId = PropertiesService.getScriptProperties().getProperty(
    "testSpreadSheetId"
  );

  const spreadsheet = SpreadsheetApp.openById(testSpreadSheetId);
  testMasterdata(spreadsheet);
  testRelationType(spreadsheet);
  Logger.log("ok");
};
