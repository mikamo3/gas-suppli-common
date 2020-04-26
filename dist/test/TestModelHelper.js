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
exports.createIntake = function (id, timingId, typeId, serving, getTiming, getServing) {
    if (id === void 0) { id = 1; }
    if (timingId === void 0) { timingId = 10; }
    if (typeId === void 0) { typeId = 100; }
    if (serving === void 0) { serving = 5; }
    if (getTiming === void 0) { getTiming = function () { return undefined; }; }
    if (getServing === void 0) { getServing = function () { return undefined; }; }
    return new index_1.Intake(exports.createIntakeValues(id, timingId, typeId, serving), getTiming, getServing);
};
exports.createMakerValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createMaker = function (id, name, getSupplis) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    if (getSupplis === void 0) { getSupplis = function () { return []; }; }
    return new index_1.Maker(exports.createMakerValues(id, name), getSupplis);
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
exports.createSuppli = function (id, typeId, makerId, name, amountPerServing, servingUnit, getType, getTiming, getSuppliAmounts) {
    if (id === void 0) { id = 1; }
    if (typeId === void 0) { typeId = 10; }
    if (makerId === void 0) { makerId = 100; }
    if (name === void 0) { name = "suppli"; }
    if (amountPerServing === void 0) { amountPerServing = 999; }
    if (servingUnit === void 0) { servingUnit = "unit"; }
    if (getType === void 0) { getType = function () { return undefined; }; }
    if (getTiming === void 0) { getTiming = function () { return undefined; }; }
    if (getSuppliAmounts === void 0) { getSuppliAmounts = function () { return []; }; }
    return new index_1.Suppli(exports.createSuppliValues(id, typeId, makerId, name, amountPerServing, servingUnit), getType, getTiming, getSuppliAmounts);
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
exports.createSuppliAmount = function (id, suppliId, amount, getSuppli) {
    if (id === void 0) { id = 0; }
    if (suppliId === void 0) { suppliId = 10; }
    if (amount === void 0) { amount = 100; }
    if (getSuppli === void 0) { getSuppli = function () { return undefined; }; }
    return new index_1.SuppliAmount(exports.createSuppliAmountValues(id, suppliId, amount), getSuppli);
};
exports.createTimingValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "timing"; }
    return ({ id: id, name: name });
};
exports.createTiming = function (id, name, getIntakes) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "timing"; }
    if (getIntakes === void 0) { getIntakes = function () { return []; }; }
    return new index_1.Timing(exports.createTimingValues(id, name), getIntakes);
};
exports.createTypeValues = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createType = function (id, name, getSupplis, getIntakes) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    if (getSupplis === void 0) { getSupplis = function () { return []; }; }
    if (getIntakes === void 0) { getIntakes = function () { return []; }; }
    return new index_1.Type(exports.createTypeValues(id, name), getSupplis, getIntakes);
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