import MockSheet from "./MockSheet";

export default class MockSpreadSheet
  implements Partial<{ [P in keyof GoogleAppsScript.Spreadsheet.Spreadsheet]: unknown }> {
  private values: Array<Array<string | number>>;
  constructor(values: Array<Array<string | number>>) {
    this.values = values;
  }
  getSheetByName() {
    return new MockSheet(this.values);
  }
}
jest.spyOn(MockSpreadSheet.prototype, "getSheetByName");
