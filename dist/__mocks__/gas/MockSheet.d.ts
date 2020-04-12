/// <reference types="google-apps-script" />
import MockRange from "./MockRange";
export default class MockSheet implements Partial<{
    [P in keyof GoogleAppsScript.Spreadsheet.Sheet]: unknown;
}> {
    private lastRow;
    private values;
    constructor(values: Array<Array<string | number>>);
    getDataRange(): MockRange;
    getLastRow(): number;
    deleteRows(rowPosition: number, howMany: number): void;
    insertRowsAfter(afterPosition: number, howMany: number): void;
    getRange(row: number, column: number, numRows: number, numColumns: number): MockRange;
}
