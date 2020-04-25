"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suppli = /** @class */ (function () {
    function Suppli(suppliWithoutRelation, getType, getMaker, getSuppliAmounts) {
        this.id = suppliWithoutRelation.id;
        this.makerId = suppliWithoutRelation.makerId;
        this.typeId = suppliWithoutRelation.typeId;
        this.amountPerServing = suppliWithoutRelation.amountPerServing;
        this.servingUnit = suppliWithoutRelation.servingUnit;
        this.name = suppliWithoutRelation.name;
        this.getType = getType;
        this.getMaker = getMaker;
        this.getSuppliAmounts = getSuppliAmounts;
    }
    Object.defineProperty(Suppli.prototype, "type", {
        get: function () {
            return this.getType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Suppli.prototype, "maker", {
        get: function () {
            return this.getMaker();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Suppli.prototype, "suppliAmounts", {
        get: function () {
            return this.getSuppliAmounts();
        },
        enumerable: true,
        configurable: true
    });
    return Suppli;
}());
exports.Suppli = Suppli;
//# sourceMappingURL=Suppli.js.map