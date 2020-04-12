"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MockRange_1 = __importDefault(require("./MockRange"));
var MockSheet = /** @class */ (function () {
    function MockSheet(values) {
        this.lastRow = 0;
        this.values = values;
    }
    MockSheet.prototype.getDataRange = function () {
        return new MockRange_1.default(this.values);
    };
    MockSheet.prototype.getLastRow = function () {
        return this.lastRow;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MockSheet.prototype.deleteRows = function (rowPosition, howMany) {
        //donothing
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MockSheet.prototype.insertRowsAfter = function (afterPosition, howMany) {
        //donothing
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MockSheet.prototype.getRange = function (row, column, numRows, numColumns) {
        return new MockRange_1.default(this.values);
    };
    return MockSheet;
}());
exports.default = MockSheet;
jest.spyOn(MockSheet.prototype, "getDataRange");
jest.spyOn(MockSheet.prototype, "getRange");
jest.spyOn(MockSheet.prototype, "getLastRow");
jest.spyOn(MockSheet.prototype, "deleteRows");
jest.spyOn(MockSheet.prototype, "insertRowsAfter");
//# sourceMappingURL=MockSheet.js.map