"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MockSheet_1 = __importDefault(require("./MockSheet"));
var MockSpreadSheet = /** @class */ (function () {
    function MockSpreadSheet(values) {
        this.values = values;
    }
    MockSpreadSheet.prototype.getSheetByName = function () {
        return new MockSheet_1.default(this.values);
    };
    return MockSpreadSheet;
}());
exports.default = MockSpreadSheet;
jest.spyOn(MockSpreadSheet.prototype, "getSheetByName");
//# sourceMappingURL=MockSpreadSheet.js.map