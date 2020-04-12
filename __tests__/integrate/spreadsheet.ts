type SheetValues = Array<Array<string | number>>;

export const deleteSpreadSheet = (testSpreadSheetId: string) => {
  try {
    const folder = DriveApp.getFileById(testSpreadSheetId);
    folder.setTrashed(true);
  } catch (e) {
    Logger.log(e);
    Logger.log("skip remove exist test spreadsheet");
  }
  Logger.log(`delete spreadSheet for test. id:${testSpreadSheetId}`);
};

export const createSpreadSheet = (spreadSheetName: string, folderId: string) => {
  const file = Drive.Files.insert({
    title: spreadSheetName,
    mimeType: "application/vnd.google-apps.spreadsheet",
    parents: [{ id: folderId }]
  });
  Logger.log(`create spreadSheet for test. id:${file.id}`);
  return file.id;
};

export const setTestdata = (
  spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  sheetName: string,
  values: SheetValues
) => {
  const appendValues = (
    spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    sheetName: string,
    values: SheetValues
  ) => {
    const getRowNum = (arr: SheetValues) => arr.length;
    const getColumnNum = (arr: SheetValues) =>
      arr.reduce<number>((column, a) => (column < a.length ? a.length : column), 0);
    const getRange = (values: SheetValues) => [1, 1, getRowNum(values), getColumnNum(values)];
    const sheet = spreadSheet.setActiveSheet(spreadSheet.getSheetByName(sheetName));
    // eslint-disable-next-line prefer-spread
    sheet.getRange.apply(sheet, getRange(values)).setValues(values);
  };
  const prepareSheet = (
    spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    sheetName: string
  ) => {
    const sheet = spreadSheet.getSheetByName(sheetName);
    if (sheet) {
      spreadSheet.deleteSheet(sheet);
    }
    spreadSheet.insertSheet(sheetName);
  };
  prepareSheet(spreadSheet, sheetName);
  appendValues(spreadSheet, sheetName, values);
};
