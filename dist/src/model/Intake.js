"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Intake = /** @class */ (function () {
    function Intake(intake, getTiming, getType) {
        this.id = intake.id;
        this.serving = intake.serving;
        this.timingId = intake.timingId;
        this.typeId = intake.typeId;
        this.getTiming = getTiming;
        this.getType = getType;
    }
    Object.defineProperty(Intake.prototype, "type", {
        get: function () {
            return this.getType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intake.prototype, "timing", {
        get: function () {
            return this.getTiming();
        },
        enumerable: true,
        configurable: true
    });
    return Intake;
}());
exports.Intake = Intake;
//# sourceMappingURL=Intake.js.map