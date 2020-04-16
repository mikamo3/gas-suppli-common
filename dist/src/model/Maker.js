"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Maker = /** @class */ (function () {
    function Maker(typeWithoutRelation, getSupplis) {
        this.id = typeWithoutRelation.id;
        this.name = typeWithoutRelation.name;
        this.getSupplis = getSupplis;
    }
    Object.defineProperty(Maker.prototype, "supplis", {
        get: function () {
            return this.getSupplis();
        },
        enumerable: true,
        configurable: true
    });
    return Maker;
}());
exports.Maker = Maker;
//# sourceMappingURL=Maker.js.map