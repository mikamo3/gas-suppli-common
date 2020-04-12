"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSuppli = jest.fn();
exports.fetchType = jest.fn();
exports.fetchMaker = jest.fn();
exports.fetchSuppliAmount = jest.fn();
exports.fetchTiming = jest.fn();
exports.fetchIntake = jest.fn();
exports.updateIntakes = jest.fn();
var fetchSuppliReturnValue = [];
var fetchTypeReturnValue = [];
var fetchMakerReturnValue = [];
var fetchSuppliAmountReturnValue = [];
var fetchTimingReturnValue = [];
var fetchIntakeReturnValue = [];
var mockedDatastore = jest.fn().mockImplementation(function () { return ({
    fetchSuppli: exports.fetchSuppli,
    fetchType: exports.fetchType,
    fetchMaker: exports.fetchMaker,
    fetchSuppliAmount: exports.fetchSuppliAmount,
    fetchTiming: exports.fetchTiming,
    fetchIntake: exports.fetchIntake,
    updateIntakes: exports.updateIntakes
}); });
exports.setFetchSuppliReturnValue = function (value) {
    fetchSuppliReturnValue = value;
};
exports.setFetchTypeReturnValue = function (value) {
    fetchTypeReturnValue = value;
};
exports.setFetchMakerReturnValue = function (value) {
    fetchMakerReturnValue = value;
};
exports.setFetchSuppliAmountReturnValue = function (value) {
    fetchSuppliAmountReturnValue = value;
};
exports.setFetchTimingReturnValue = function (value) {
    fetchTimingReturnValue = value;
};
exports.setFetchIntakeReturnValue = function (value) {
    fetchIntakeReturnValue = value;
};
exports.default = mockedDatastore;
exports.createType = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createSuppli = function (id, typeId, makerId, name, amountPerServing, servingUnit) {
    if (id === void 0) { id = 1; }
    if (typeId === void 0) { typeId = 10; }
    if (makerId === void 0) { makerId = 100; }
    if (name === void 0) { name = "suppli"; }
    if (amountPerServing === void 0) { amountPerServing = 999; }
    if (servingUnit === void 0) { servingUnit = "unit"; }
    return ({ id: id, typeId: typeId, makerId: makerId, name: name, amountPerServing: amountPerServing, servingUnit: servingUnit });
};
exports.createSuppliAmount = function (id, suppliId, amount) {
    if (id === void 0) { id = 0; }
    if (suppliId === void 0) { suppliId = 10; }
    if (amount === void 0) { amount = 100; }
    return ({
        id: id,
        suppliId: suppliId,
        amount: amount
    });
};
exports.createMaker = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "type"; }
    return ({
        id: id,
        name: name
    });
};
exports.createTiming = function (id, name) {
    if (id === void 0) { id = 1; }
    if (name === void 0) { name = "timing"; }
    return ({ id: id, name: name });
};
exports.createIntake = function (id, timingId, typeId, serving) {
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
exports.init = function () {
    fetchSuppliReturnValue = [];
    fetchTypeReturnValue = [];
    fetchMakerReturnValue = [];
    fetchSuppliAmountReturnValue = [];
    fetchTimingReturnValue = [];
    fetchIntakeReturnValue = [];
    beforeEach(function () {
        exports.fetchSuppli.mockReturnValue(fetchSuppliReturnValue);
        exports.fetchType.mockReturnValue(fetchTypeReturnValue);
        exports.fetchMaker.mockReturnValue(fetchMakerReturnValue);
        exports.fetchSuppliAmount.mockReturnValue(fetchSuppliAmountReturnValue);
        exports.fetchTiming.mockReturnValue(fetchTimingReturnValue);
        exports.fetchIntake.mockReturnValue(fetchIntakeReturnValue);
    });
};
//# sourceMappingURL=MockDatastore.js.map