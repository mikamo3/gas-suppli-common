"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type = /** @class */ (function () {
    function Type(typeWithoutRelation, getSupplis, getIntakes) {
        this.id = typeWithoutRelation.id;
        this.name = typeWithoutRelation.name;
        this.getSupplis = getSupplis;
        this.getIntakes = getIntakes;
    }
    Object.defineProperty(Type.prototype, "supplis", {
        get: function () {
            return this.getSupplis();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "intakes", {
        get: function () {
            return this.getIntakes();
        },
        enumerable: true,
        configurable: true
    });
    return Type;
}());
exports.Type = Type;
//# sourceMappingURL=Type.js.map