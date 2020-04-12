export default class MockRange
  implements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<{ [P in keyof GoogleAppsScript.Spreadsheet.Range]: any }> {
  private values: Array<Array<string | number>>;
  constructor(values: Array<Array<string | number>>) {
    this.values = values;
  }
  getValues() {
    return this.values;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setValues(values: Array<Array<string | number>>) {
    //donothing
  }
}
jest.spyOn(MockRange.prototype, "getValues");
jest.spyOn(MockRange.prototype, "setValues");
