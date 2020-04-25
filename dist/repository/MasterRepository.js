"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = require("underscore");
var index_1 = require("../model/index");
var MasterRepository = /** @class */ (function () {
    function MasterRepository(datastore) {
        this.datastore = datastore;
    }
    MasterRepository.prototype.getTypes = function () {
        var _this = this;
        var types = this.datastore.fetchType();
        return types.map(function (t) { return _this.createType(t); });
    };
    MasterRepository.prototype.getTypeById = function (id) {
        var types = this.datastore.fetchType();
        var type = underscore_1.find(types, function (f) { return f.id === id; });
        if (!type) {
            return undefined;
        }
        return this.createType(type);
    };
    MasterRepository.prototype.getSupplis = function () {
        var _this = this;
        var supplis = this.datastore.fetchSuppli();
        return supplis.map(function (s) { return _this.createSuppli(s); });
    };
    MasterRepository.prototype.getSuppliById = function (id) {
        var supplis = this.datastore.fetchSuppli();
        var fSuppli = underscore_1.find(supplis, function (s) { return s.id === id; });
        if (!fSuppli) {
            return undefined;
        }
        return this.createSuppli(fSuppli);
    };
    MasterRepository.prototype.getSupplisByTypeId = function (typeId) {
        var _this = this;
        var supplis = this.datastore.fetchSuppli();
        var fSupplis = underscore_1.filter(supplis, function (s) { return s.typeId === typeId; });
        return fSupplis.map(function (fs) { return _this.createSuppli(fs); });
    };
    MasterRepository.prototype.getSupplisByMakerId = function (makerId) {
        var _this = this;
        var supplis = this.datastore.fetchSuppli();
        var fSupplis = underscore_1.filter(supplis, function (s) { return s.makerId === makerId; });
        return fSupplis.map(function (fs) { return _this.createSuppli(fs); });
    };
    MasterRepository.prototype.getMakers = function () {
        var _this = this;
        var makers = this.datastore.fetchMaker();
        return makers.map(function (m) { return _this.createMaker(m); });
    };
    MasterRepository.prototype.getMakerById = function (id) {
        var makers = this.datastore.fetchMaker();
        var maker = underscore_1.find(makers, function (m) { return m.id === id; });
        if (!maker) {
            return undefined;
        }
        return this.createMaker(maker);
    };
    MasterRepository.prototype.getSuppliAmounts = function () {
        var _this = this;
        var suppliAmounts = this.datastore.fetchSuppliAmount();
        return suppliAmounts.map(function (sa) { return _this.createSuppliAmounts(sa); });
    };
    MasterRepository.prototype.getSuppliAmountsBySuppliId = function (suppliId) {
        var _this = this;
        var suppliAmounts = this.datastore.fetchSuppliAmount();
        return underscore_1.filter(suppliAmounts, function (sa) { return sa.suppliId === suppliId; }).map(function (sa) {
            return _this.createSuppliAmounts(sa);
        });
    };
    MasterRepository.prototype.getTimings = function () {
        var _this = this;
        var timings = this.datastore.fetchTiming();
        return timings.map(function (t) { return _this.createTiming(t); });
    };
    MasterRepository.prototype.getTimingById = function (id) {
        var timings = this.datastore.fetchTiming();
        var fTiming = underscore_1.find(timings, function (t) { return t.id === id; });
        if (!fTiming) {
            return undefined;
        }
        return this.createTiming(fTiming);
    };
    MasterRepository.prototype.getIntakes = function () {
        var _this = this;
        var intakes = this.datastore.fetchIntake();
        return intakes.map(function (i) { return _this.createIntake(i); });
    };
    MasterRepository.prototype.getIntakeById = function (id) {
        var intakes = this.datastore.fetchIntake();
        var fIntake = underscore_1.find(intakes, function (i) { return i.id === id; });
        if (!fIntake) {
            return undefined;
        }
        return this.createIntake(fIntake);
    };
    MasterRepository.prototype.getIntakesByTypeId = function (typeId) {
        var _this = this;
        var intakes = this.datastore.fetchIntake();
        return underscore_1.filter(intakes, function (i) { return i.typeId === typeId; }).map(function (i) { return _this.createIntake(i); });
    };
    MasterRepository.prototype.getIntakesByTimingId = function (timingId) {
        var _this = this;
        var intakes = this.datastore.fetchIntake();
        return underscore_1.filter(intakes, function (i) { return i.timingId === timingId; }).map(function (i) { return _this.createIntake(i); });
    };
    MasterRepository.prototype.getForms = function () {
        var _this = this;
        var forms = this.datastore.fetchForm();
        return forms.map(function (f) { return _this.createForm(f); });
    };
    MasterRepository.prototype.updateIntakes = function (intakes) {
        var intakeValues = intakes.map(function (i) {
            if (i instanceof index_1.Intake) {
                return {
                    id: i.id,
                    serving: i.serving,
                    timingId: i.timingId,
                    typeId: i.typeId
                };
            }
            return i;
        });
        this.datastore.updateIntakes(intakeValues);
    };
    MasterRepository.prototype.createType = function (type) {
        var _this = this;
        return new index_1.Type(type, function () { return _this.getSupplisByTypeId(type.id); }, function () { return _this.getIntakesByTypeId(type.id); });
    };
    MasterRepository.prototype.createSuppli = function (suppli) {
        var _this = this;
        return new index_1.Suppli(suppli, function () { return _this.getTypeById(suppli.typeId); }, function () { return _this.getMakerById(suppli.makerId); }, function () { return _this.getSuppliAmountsBySuppliId(suppli.id); });
    };
    MasterRepository.prototype.createMaker = function (maker) {
        var _this = this;
        return new index_1.Maker(maker, function () { return _this.getSupplisByMakerId(maker.id); });
    };
    MasterRepository.prototype.createSuppliAmounts = function (suppliAmount) {
        var _this = this;
        return new index_1.SuppliAmount(suppliAmount, function () { return _this.getSuppliById(suppliAmount.suppliId); });
    };
    MasterRepository.prototype.createTiming = function (timing) {
        var _this = this;
        return new index_1.Timing(timing, function () { return _this.getIntakesByTimingId(timing.id); });
    };
    MasterRepository.prototype.createIntake = function (intake) {
        var _this = this;
        return new index_1.Intake(intake, function () { return _this.getTimingById(intake.timingId); }, function () { return _this.getTypeById(intake.typeId); });
    };
    MasterRepository.prototype.createForm = function (form) {
        var _this = this;
        return new index_1.Form(form, function () { return _this.getIntakeById(form.intakeId); });
    };
    return MasterRepository;
}());
exports.MasterRepository = MasterRepository;
//# sourceMappingURL=MasterRepository.js.map