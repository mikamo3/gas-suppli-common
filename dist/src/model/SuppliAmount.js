"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SuppliAmount = /** @class */ (function () {
    function SuppliAmount(suppliAmountWithoutRelation, getSuppli) {
        this.id = suppliAmountWithoutRelation.id;
        this.amount = suppliAmountWithoutRelation.amount;
        this.suppliId = suppliAmountWithoutRelation.suppliId;
        this.getSuppli = getSuppli;
    }
    Object.defineProperty(SuppliAmount.prototype, "suppli", {
        get: function () {
            return this.getSuppli();
        },
        enumerable: true,
        configurable: true
    });
    return SuppliAmount;
}());
exports.SuppliAmount = SuppliAmount;
//# sourceMappingURL=SuppliAmount.js.map