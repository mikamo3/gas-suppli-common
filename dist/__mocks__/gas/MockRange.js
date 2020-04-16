"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockRange = /** @class */ (function () {
    function MockRange(values) {
        this.values = values;
    }
    MockRange.prototype.getValues = function () {
        return this.values;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MockRange.prototype.setValues = function (values) {
        //donothing
    };
    return MockRange;
}());
exports.default = MockRange;
jest.spyOn(MockRange.prototype, "getValues");
jest.spyOn(MockRange.prototype, "setValues");
//# sourceMappingURL=MockRange.js.map