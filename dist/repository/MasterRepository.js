"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = require("underscore");
var index_1 = require("../model/index");
var relation_1 = require("../model/relation");
var MasterRepository = /** @class */ (function () {
    function MasterRepository(datastore) {
        this.datastore = datastore;
    }
    MasterRepository.prototype.getTypes = function () {
        var _this = this;
        return this.datastore.fetchType().map(function (t) { return relation_1.createType(t, _this); });
    };
    MasterRepository.prototype.getTypeById = function (id) {
        var type = this.getFirstBy("id", id, this.datastore.fetchType());
        return type ? relation_1.createType(type, this) : undefined;
    };
    MasterRepository.prototype.getSupplis = function () {
        var _this = this;
        return this.datastore.fetchSuppli().map(function (s) { return relation_1.createSuppli(s, _this); });
    };
    MasterRepository.prototype.getSuppliById = function (id) {
        var suppli = this.getFirstBy("id", id, this.datastore.fetchSuppli());
        return suppli ? relation_1.createSuppli(suppli, this) : undefined;
    };
    MasterRepository.prototype.getSupplisByTypeId = function (typeId) {
        var _this = this;
        return this.getBy("typeId", typeId, this.datastore.fetchSuppli()).map(function (fs) {
            return relation_1.createSuppli(fs, _this);
        });
    };
    MasterRepository.prototype.getSupplisByMakerId = function (makerId) {
        var _this = this;
        return this.getBy("makerId", makerId, this.datastore.fetchSuppli()).map(function (fs) {
            return relation_1.createSuppli(fs, _this);
        });
    };
    MasterRepository.prototype.getMakers = function () {
        var _this = this;
        return this.datastore.fetchMaker().map(function (m) { return relation_1.createMaker(m, _this); });
    };
    MasterRepository.prototype.getMakerById = function (id) {
        var maker = this.getFirstBy("id", id, this.datastore.fetchMaker());
        return maker ? relation_1.createMaker(maker, this) : undefined;
    };
    MasterRepository.prototype.getMakerByName = function (name) {
        var maker = this.getFirstBy("name", name, this.datastore.fetchMaker());
        return maker ? relation_1.createMaker(maker, this) : undefined;
    };
    MasterRepository.prototype.getSuppliAmounts = function () {
        var _this = this;
        return this.datastore
            .fetchSuppliAmount()
            .map(function (sa) { return relation_1.createSuppliAmounts(sa, _this); });
    };
    MasterRepository.prototype.getSuppliAmountsBySuppliId = function (suppliId) {
        var _this = this;
        return this.getBy("suppliId", suppliId, this.datastore.fetchSuppliAmount()).map(function (sa) { return relation_1.createSuppliAmounts(sa, _this); });
    };
    MasterRepository.prototype.getTimings = function () {
        var _this = this;
        return this.datastore.fetchTiming().map(function (t) { return relation_1.createTiming(t, _this); });
    };
    MasterRepository.prototype.getTimingById = function (id) {
        var timing = this.getFirstBy("id", id, this.datastore.fetchTiming());
        return timing ? relation_1.createTiming(timing, this) : undefined;
    };
    MasterRepository.prototype.getTimingByName = function (name) {
        var timing = this.getFirstBy("name", name, this.datastore.fetchTiming());
        return timing ? relation_1.createTiming(timing, this) : undefined;
    };
    MasterRepository.prototype.getIntakes = function () {
        var _this = this;
        return this.datastore.fetchIntake().map(function (i) { return relation_1.createIntake(i, _this); });
    };
    MasterRepository.prototype.getIntakeById = function (id) {
        var intake = this.getFirstBy("id", id, this.datastore.fetchIntake());
        return intake ? relation_1.createIntake(intake, this) : undefined;
    };
    MasterRepository.prototype.getIntakesByTypeId = function (typeId) {
        var _this = this;
        return this.getBy("typeId", typeId, this.datastore.fetchIntake()).map(function (i) {
            return relation_1.createIntake(i, _this);
        });
    };
    MasterRepository.prototype.getIntakesByTimingId = function (timingId) {
        var _this = this;
        return this.getBy("timingId", timingId, this.datastore.fetchIntake()).map(function (i) {
            return relation_1.createIntake(i, _this);
        });
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
    MasterRepository.prototype.getFirstBy = function (key, search, data) {
        return underscore_1.find(data, function (d) { return d[key] === search; });
    };
    MasterRepository.prototype.getBy = function (key, search, data) {
        return underscore_1.filter(data, function (d) { return d[key] === search; });
    };
    return MasterRepository;
}());
exports.MasterRepository = MasterRepository;
//# sourceMappingURL=MasterRepository.js.map