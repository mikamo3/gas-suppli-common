/// <reference types="google-apps-script" />
export declare class AssertionError extends Error {
    constructor(actual: unknown, expected: unknown);
}
export declare const assert: (message: string) => {
    toEqual: (actual: unknown, expected: unknown) => void;
    toMatchObject: (actual: object, expected: object) => void;
};
export declare const testMasterRepository: (message: string, spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, beforeRun: (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) => void, test: Function, afterRun?: (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) => void) => void;
