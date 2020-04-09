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
}
jest.spyOn(MockRange.prototype, "getValues");
