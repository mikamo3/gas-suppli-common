import MockRange from "./MockRange";

export default class MockSheet
  implements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<{ [P in keyof GoogleAppsScript.Spreadsheet.Spreadsheet]: any }> {
  private values: Array<Array<string | number>>;
  constructor(values: Array<Array<string | number>>) {
    this.values = values;
  }
  getDataRange() {
    return new MockRange(this.values);
  }
  getSheetByName() {
    return new MockSheet(this.values);
  }
}
jest.spyOn(MockSheet.prototype, "getDataRange");
jest.spyOn(MockSheet.prototype, "getSheetByName");
