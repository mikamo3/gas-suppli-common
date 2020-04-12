import MockSheet from "./MockSheet";

export default class MockSpreadSheet
  implements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<{ [P in keyof GoogleAppsScript.Spreadsheet.Spreadsheet]: any }> {
  private values: Array<Array<string | number>>;
  constructor(values: Array<Array<string | number>>) {
    this.values = values;
  }
  getSheetByName() {
    return new MockSheet(this.values);
  }
}
jest.spyOn(MockSpreadSheet.prototype, "getSheetByName");
