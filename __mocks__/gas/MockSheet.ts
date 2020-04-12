import MockRange from "./MockRange";

export default class MockSheet
  implements Partial<{ [P in keyof GoogleAppsScript.Spreadsheet.Sheet]: unknown }> {
  private lastRow: number;
  private values: Array<Array<string | number>>;
  constructor(values: Array<Array<string | number>>) {
    this.lastRow = 0;
    this.values = values;
  }
  getDataRange() {
    return new MockRange(this.values);
  }
  getLastRow() {
    return this.lastRow;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteRows(rowPosition: number, howMany: number) {
    //donothing
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertRowsAfter(afterPosition: number, howMany: number) {
    //donothing
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRange(row: number, column: number, numRows: number, numColumns: number) {
    return new MockRange(this.values);
  }
}

jest.spyOn(MockSheet.prototype, "getDataRange");
jest.spyOn(MockSheet.prototype, "getRange");
jest.spyOn(MockSheet.prototype, "getLastRow");
jest.spyOn(MockSheet.prototype, "deleteRows");
jest.spyOn(MockSheet.prototype, "insertRowsAfter");
