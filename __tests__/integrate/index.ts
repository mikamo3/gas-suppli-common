import testMasterdata from "./test/testMasterdata";
import testRelationType from "./test/testRelationType";
import testUpdateIntakes from "./test/testUpdateIntakes";
import { PropertyNames } from "constant/index";
import { TestSpreadsheetHelper } from "gas-lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;
const prepareSpreadsheet = () => {
  const testFolderId = "1-Jp4B5XDGThm2bjKNxqme_6_5o0Xo4S3";
  const spreadSheetName = "サプリマスタ_テスト";
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    PropertyNames.mastersheetId
  );
  if (spreadsheetId) {
    TestSpreadsheetHelper.deleteSpreadSheet(spreadsheetId);
    PropertiesService.getScriptProperties().setProperty(PropertyNames.mastersheetId, "");
  }
  const newSpreadsheetId = TestSpreadsheetHelper.createSpreadSheet(spreadSheetName, testFolderId);
  if (!newSpreadsheetId) {
    throw new Error("createFailed");
  }
  PropertiesService.getScriptProperties().setProperty(
    PropertyNames.mastersheetId,
    newSpreadsheetId
  );
};
global.runTest = () => {
  prepareSpreadsheet();
  testMasterdata();
  testRelationType();
  testUpdateIntakes();
  Logger.log("ok");
};
