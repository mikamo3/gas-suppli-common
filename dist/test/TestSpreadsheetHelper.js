"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntakeSheet = function (intakes) {
    return __spreadArrays([
        ["id", "timingId", "typeId", "serving"]
    ], intakes.map(function (intake) { return [
        intake.id,
        intake.timingId,
        intake.typeId,
        intake.serving
    ]; }));
};
exports.createMakerSheet = function (makers) {
    return __spreadArrays([["id", "name"]], makers.map(function (maker) { return [maker.id, maker.name]; }));
};
exports.createSuppliSheet = function (supplis) {
    return __spreadArrays([
        ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"]
    ], supplis.map(function (suppli) { return [
        suppli.id,
        suppli.typeId,
        suppli.makerId,
        suppli.name,
        suppli.amountPerServing,
        suppli.servingUnit
    ]; }));
};
exports.createSuppliAmountSheet = function (suppliAmounts) {
    return __spreadArrays([
        ["id", "suppliId", "amount"]
    ], suppliAmounts.map(function (suppliAmount) { return [
        suppliAmount.id,
        suppliAmount.suppliId,
        suppliAmount.amount
    ]; }));
};
exports.createTimingSheet = function (timings) {
    return __spreadArrays([["id", "name"]], timings.map(function (timing) { return [timing.id, timing.name]; }));
};
exports.createTypeSheet = function (types) {
    return __spreadArrays([["id", "name"]], types.map(function (type) { return [type.id, type.name]; }));
};
exports.createIntakeDetailSheet = function (intakeDetails) {
    return __spreadArrays(intakeDetails.map(function (intakeDetail) { return [
        intakeDetail.date.toISOString(),
        intakeDetail.timingId,
        intakeDetail.suppliId,
        intakeDetail.serving
    ]; }));
};
//# sourceMappingURL=TestSpreadsheetHelper.js.map