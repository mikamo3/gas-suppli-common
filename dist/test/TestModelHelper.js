"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createSuppliValues = function (id, typeId, makerId, name, amountPerServing, servingUnit) {
    if (id === void 0) { id = 1; }
    if (typeId === void 0) { typeId = 10; }
    if (makerId === void 0) { makerId = 100; }
    if (name === void 0) { name = "suppli"; }
    if (amountPerServing === void 0) { amountPerServing = 999; }
    if (servingUnit === void 0) { servingUnit = "unit"; }
    return ({ id: id, typeId: typeId, makerId: makerId, name: name, amountPerServing: amountPerServing, servingUnit: servingUnit });
};
exports.createSuppliAmountValues = function (id, suppliId, amount) {
    if (id === void 0) { id = 0; }
    if (suppliId === void 0) { suppliId = 10; }
    if (amount === void 0) { amount = 100; }
    return ({
        id: id,
        suppliId: suppliId,
        amount: amount
    });
};
exports.createMakerValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createTimingValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "timing"; }
    return ({ id: id, name: name });
};
exports.createIntakeValues = function (id, timingId, typeId, serving) {
    if (id === void 0) { id = 1; }
    if (timingId === void 0) { timingId = 10; }
    if (typeId === void 0) { typeId = 100; }
    if (serving === void 0) { serving = 5; }
    return ({
        id: id,
        timingId: timingId,
        typeId: typeId,
        serving: serving
    });
};
//# sourceMappingURL=TestModelHelper.js.map