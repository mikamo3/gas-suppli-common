/// <reference types="google-apps-script" />
import MockSheet from "./MockSheet";
export default class MockSpreadSheet implements Partial<{
    [P in keyof GoogleAppsScript.Spreadsheet.Spreadsheet]: unknown;
}> {
    private values;
    constructor(values: Array<Array<string | number>>);
    getSheetByName(): MockSheet;
}
