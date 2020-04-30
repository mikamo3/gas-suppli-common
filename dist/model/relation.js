"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type_1 = require("./Type");
var Maker_1 = require("./Maker");
var Suppli_1 = require("./Suppli");
var SuppliAmount_1 = require("./SuppliAmount");
var Timing_1 = require("./Timing");
var Intake_1 = require("./Intake");
exports.createType = function (type, repository) {
    return new Type_1.Type(type, function () { return repository.getSupplisByTypeId(type.id); }, function () { return repository.getIntakesByTypeId(type.id); });
};
exports.createSuppli = function (suppli, repository) {
    return new Suppli_1.Suppli(suppli, function () { return repository.getTypeById(suppli.typeId); }, function () { return repository.getMakerById(suppli.makerId); }, function () { return repository.getSuppliAmountsBySuppliId(suppli.id); });
};
exports.createMaker = function (maker, repository) {
    return new Maker_1.Maker(maker, function () { return repository.getSupplisByMakerId(maker.id); });
};
exports.createSuppliAmounts = function (suppliAmount, repository) {
    return new SuppliAmount_1.SuppliAmount(suppliAmount, function () { return repository.getSuppliById(suppliAmount.suppliId); });
};
exports.createTiming = function (timing, repository) {
    return new Timing_1.Timing(timing, function () { return repository.getIntakesByTimingId(timing.id); });
};
exports.createIntake = function (intake, repository) {
    return new Intake_1.Intake(intake, function () { return repository.getTimingById(intake.timingId); }, function () { return repository.getTypeById(intake.typeId); });
};
//# sourceMappingURL=relation.js.map