/// <reference types="google-apps-script" />
export default class MockRange implements Partial<{
    [P in keyof GoogleAppsScript.Spreadsheet.Range]: unknown;
}> {
    private values;
    constructor(values: Array<Array<string | number>>);
    getValues(): (string | number)[][];
    setValues(values: Array<Array<string | number>>): void;
}
