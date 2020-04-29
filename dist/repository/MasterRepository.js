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
        return this.getById(id, types, this.createType);
    };
    MasterRepository.prototype.getSupplis = function () {
        var _this = this;
        var supplis = this.datastore.fetchSuppli();
        return supplis.map(function (s) { return _this.createSuppli(s); });
    };
    MasterRepository.prototype.getSuppliById = function (id) {
        var supplis = this.datastore.fetchSuppli();
        return this.getById(id, supplis, this.createSuppli);
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
        return this.getById(id, makers, this.createMaker);
    };
    MasterRepository.prototype.getMakerByName = function (name) {
        var makers = this.datastore.fetchMaker();
        return this.getByName(name, makers, this.createMaker);
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
        return this.getById(id, timings, this.createTiming);
    };
    MasterRepository.prototype.getTimingByName = function (name) {
        var timings = this.datastore.fetchTiming();
        return this.getByName(name, timings, this.createTiming);
    };
    MasterRepository.prototype.getIntakes = function () {
        var _this = this;
        var intakes = this.datastore.fetchIntake();
        return intakes.map(function (i) { return _this.createIntake(i); });
    };
    MasterRepository.prototype.getIntakeById = function (id) {
        var intakes = this.datastore.fetchIntake();
        return this.getById(id, intakes, this.createIntake);
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
    MasterRepository.prototype.addIntakeDetails = function (intakeDetails) {
        var intakeDetailValues = intakeDetails.map(function (id) {
            if (id instanceof index_1.IntakeDetail) {
                return {
                    date: id.date,
                    serving: id.serving,
                    suppliId: id.suppliId,
                    timingId: id.timingId
                };
            }
            return id;
        });
        this.datastore.addIntakeDetails(intakeDetailValues);
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
    MasterRepository.prototype.getById = function (id, data, create) {
        var findData = underscore_1.find(data, function (d) { return d.id === id; });
        if (findData) {
            return create(findData);
        }
        return undefined;
    };
    MasterRepository.prototype.getByName = function (name, data, create) {
        var findData = underscore_1.find(data, function (d) { return d.name === name; });
        if (findData) {
            return create(findData);
        }
        return undefined;
    };
    return MasterRepository;
}());
exports.MasterRepository = MasterRepository;
//# sourceMappingURL=MasterRepository.js.map