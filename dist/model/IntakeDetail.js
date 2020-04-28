"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IntakeDetail = /** @class */ (function () {
    function IntakeDetail(intakeDetail, getTiming, getSuppli) {
        this.date = intakeDetail.date;
        this.timingId = intakeDetail.timingId;
        this.suppliId = intakeDetail.suppliId;
        this.serving = intakeDetail.serving;
        this.getTiming = getTiming;
        this.getSuppli = getSuppli;
    }
    Object.defineProperty(IntakeDetail.prototype, "timing", {
        get: function () {
            return this.getTiming();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntakeDetail.prototype, "suppli", {
        get: function () {
            return this.getSuppli();
        },
        enumerable: true,
        configurable: true
    });
    return IntakeDetail;
}());
exports.IntakeDetail = IntakeDetail;
//# sourceMappingURL=IntakeDetail.js.map