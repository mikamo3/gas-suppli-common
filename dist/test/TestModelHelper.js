"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../model/index");
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
exports.createIntake = function (id, timingId, typeId, serving) {
    if (id === void 0) { id = 1; }
    if (timingId === void 0) { timingId = 10; }
    if (typeId === void 0) { typeId = 100; }
    if (serving === void 0) { serving = 5; }
    return new index_1.Intake(exports.createIntakeValues(id, timingId, typeId, serving), function () { return undefined; }, function () { return undefined; });
};
exports.createMakerValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createMaker = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return new index_1.Maker(exports.createMakerValues(id, name), function () { return []; });
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
exports.createSuppli = function (id, typeId, makerId, name, amountPerServing, servingUnit) {
    if (id === void 0) { id = 1; }
    if (typeId === void 0) { typeId = 10; }
    if (makerId === void 0) { makerId = 100; }
    if (name === void 0) { name = "suppli"; }
    if (amountPerServing === void 0) { amountPerServing = 999; }
    if (servingUnit === void 0) { servingUnit = "unit"; }
    return new index_1.Suppli(exports.createSuppliValues(id, typeId, makerId, name, amountPerServing, servingUnit), function () { return undefined; }, function () { return undefined; }, function () { return []; });
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
exports.createSuppliAmount = function (id, suppliId, amount) {
    if (id === void 0) { id = 0; }
    if (suppliId === void 0) { suppliId = 10; }
    if (amount === void 0) { amount = 100; }
    return new index_1.SuppliAmount(exports.createSuppliAmountValues(id, suppliId, amount), function () { return undefined; });
};
exports.createTimingValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "timing"; }
    return ({ id: id, name: name });
};
exports.createTiming = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "timing"; }
    return new index_1.Timing(exports.createTimingValues(id, name), function () { return []; });
};
exports.createTypeValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createType = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return new index_1.Type(exports.createTypeValues(id, name), function () { return []; }, function () { return []; });
};
exports.createFormValues = function (id, intakeId, formId) {
    if (id === void 0) { id = 1; }
    if (intakeId === void 0) { intakeId = 10; }
    if (formId === void 0) { formId = "id"; }
    return ({
        id: id,
        intakeId: intakeId,
        formId: formId
    });
};
exports.createForm = function (id, intakeId, formId) {
    if (id === void 0) { id = 1; }
    if (intakeId === void 0) { intakeId = 10; }
    if (formId === void 0) { formId = "id"; }
    return new index_1.Form(exports.createFormValues(id, intakeId, formId), function () { return undefined; });
};
//# sourceMappingURL=TestModelHelper.js.map