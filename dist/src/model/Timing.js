"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timing = /** @class */ (function () {
    function Timing(timing, getIntakes) {
        this.id = timing.id;
        this.name = timing.name;
        this.getIntakes = getIntakes;
    }
    Object.defineProperty(Timing.prototype, "intakes", {
        get: function () {
            return this.getIntakes();
        },
        enumerable: true,
        configurable: true
    });
    return Timing;
}());
exports.Timing = Timing;
//# sourceMappingURL=Timing.js.map