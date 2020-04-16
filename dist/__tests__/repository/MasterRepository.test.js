"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("datastore/index");
var index_2 = require("model/index");
var index_3 = require("repository/index");
var model_1 = require("testhelper/model");
var utils_1 = require("ts-jest/utils");
var masterRepository;
var datastore;
jest.spyOn(index_1.DummyDatastore.prototype, "fetchType");
jest.spyOn(index_1.DummyDatastore.prototype, "fetchSuppli");
jest.spyOn(index_1.DummyDatastore.prototype, "fetchIntake");
jest.spyOn(index_1.DummyDatastore.prototype, "fetchSuppliAmount");
jest.spyOn(index_1.DummyDatastore.prototype, "fetchMaker");
jest.spyOn(index_1.DummyDatastore.prototype, "fetchTiming");
jest.spyOn(index_1.DummyDatastore.prototype, "updateIntakes");
beforeEach(function () {
    datastore = new index_1.DummyDatastore({});
    masterRepository = new index_3.MasterRepository(datastore);
});
afterEach(function () {
    jest.clearAllMocks();
});
describe("getTypes", function () {
    var fetchTypeReturnValue;
    var fetchSuppliReturnValue;
    var fetchIntakeReturnValue;
    var actual;
    beforeEach(function () {
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchType).mockReturnValue(fetchTypeReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchIntake).mockReturnValue(fetchIntakeReturnValue);
        actual = masterRepository.getTypes();
    });
    describe("複数件の場合", function () {
        beforeAll(function () {
            fetchTypeReturnValue = [
                model_1.createType(1, "type1"),
                model_1.createType(2, "type2"),
                model_1.createType(3, "type3")
            ];
        });
        it("Typeが件数分返却されること", function () {
            expect(actual.length).toEqual(3);
        });
        it("propertyが期待値どおりであること", function () {
            var expected = fetchTypeReturnValue[0];
            expect(actual[0]).toMatchObject(expected);
            expect(actual[0]).toHaveProperty("supplis");
        });
    });
    describe("存在しない場合", function () {
        beforeAll(function () {
            fetchTypeReturnValue = [];
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        beforeAll(function () {
            fetchTypeReturnValue = [
                model_1.createType(1, "type1"),
                model_1.createType(2, "type2"),
                model_1.createType(3, "type3")
            ];
        });
        describe("supplis", function () {
            beforeAll(function () {
                fetchSuppliReturnValue = [model_1.createSuppli(100, 1), model_1.createSuppli(101, 1), model_1.createSuppli(102, 3)];
            });
            it("Suppliが存在する場合はそれが返却されること", function () {
                expect(actual[0].supplis).toHaveLength(2);
                expect(actual[0].supplis[0].id).toEqual(100);
                expect(actual[0].supplis[1].id).toEqual(101);
            });
            it("Suppliが存在しない場合は空配列が返却されること", function () {
                expect(actual[1].supplis).toMatchObject([]);
            });
        });
        describe("intakes", function () {
            beforeAll(function () {
                fetchIntakeReturnValue = [
                    model_1.createIntake(10, 10, 1, 5),
                    model_1.createIntake(11, 11, 1, 6),
                    model_1.createIntake(12, 12, 3, 7)
                ];
            });
            it("Intakeが存在する場合はそれが返却されること", function () {
                expect(actual[0].intakes).toHaveLength(2);
                expect(actual[0].intakes[0].id).toEqual(10);
                expect(actual[0].intakes[1].id).toEqual(11);
            });
            it("Suppliが存在しない場合は空配列が返却されること", function () {
                expect(actual[1].intakes).toMatchObject([]);
            });
        });
    });
});
describe("getSupplis", function () {
    var fetchSuppliReturnValue;
    var fetchTypeReturnValue;
    var fetchMakerReturnValue;
    var fetchSuppliAmountReturnValue;
    var actual;
    beforeAll(function () {
        fetchSuppliReturnValue = [
            model_1.createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
            model_1.createSuppli(2, 11, 101, "suppli2", 11, "unit2")
        ];
    });
    beforeEach(function () {
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchType).mockReturnValue(fetchTypeReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchMaker).mockReturnValue(fetchMakerReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchSuppliAmount).mockReturnValue(fetchSuppliAmountReturnValue);
        actual = masterRepository.getSupplis();
    });
    it("Suppliが件数分返却されること", function () {
        expect(actual).toHaveLength(2);
    });
    it("propertyが期待値どおりであること", function () {
        var expected = fetchSuppliReturnValue[0];
        expect(actual[0]).toMatchObject(expected);
        expect(actual[0]).toHaveProperty("type");
        expect(actual[0]).toHaveProperty("maker");
        expect(actual[0]).toHaveProperty("suppliAmounts");
    });
    describe("存在しない場合", function () {
        beforeAll(function () {
            fetchSuppliReturnValue = [];
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        beforeAll(function () {
            fetchSuppliReturnValue = [
                model_1.createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
                model_1.createSuppli(2, 11, 101, "suppli2", 11, "unit2")
            ];
        });
        describe("type", function () {
            beforeAll(function () {
                fetchTypeReturnValue = [model_1.createType(10, "type1"), model_1.createType(12, "type2")];
            });
            it("Suppliが存在する場合はそれが返却されること", function () {
                expect(actual[0].type).toMatchObject(fetchTypeReturnValue[0]);
            });
            it("Suppliが存在しない場合はundefinedが返却されること", function () {
                expect(actual[1].type).toBeUndefined();
            });
        });
        describe("maker", function () {
            beforeAll(function () {
                fetchMakerReturnValue = [model_1.createMaker(101), model_1.createMaker(102)];
            });
            it("Makerが存在する場合はそれが返却されること", function () {
                expect(actual[1].maker).toMatchObject(fetchMakerReturnValue[0]);
            });
            it("Makerが存在しない場合はundefinedが返却されること", function () {
                expect(actual[0].maker).toBeUndefined();
            });
        });
        describe("suppliAmounts", function () {
            beforeAll(function () {
                fetchSuppliAmountReturnValue = [
                    model_1.createSuppliAmount(1000, 1),
                    model_1.createSuppliAmount(1001, 1),
                    model_1.createSuppliAmount(1002, 3)
                ];
            });
            it("SuppliAmountsが存在する場合はそれが返却されること", function () {
                expect(actual[0].suppliAmounts).toHaveLength(2);
                expect(actual[0].suppliAmounts[0].id).toEqual(1000);
                expect(actual[0].suppliAmounts[1].id).toEqual(1001);
            });
            it("SuppliAmountsが存在しない場合は空配列が返却されること", function () {
                expect(actual[1].suppliAmounts).toEqual([]);
            });
        });
    });
});
describe("getMakers", function () {
    var actual;
    var fetchMakerReturnValue;
    var fetchSuppliReturnValue;
    beforeEach(function () {
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchMaker).mockReturnValue(fetchMakerReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
        actual = masterRepository.getMakers();
    });
    describe("複数件の場合", function () {
        beforeAll(function () {
            fetchMakerReturnValue = [
                model_1.createMaker(1, "maker1"),
                model_1.createMaker(2, "maker2"),
                model_1.createMaker(3, "maker3")
            ];
        });
        it("Makerが件数分返却されること", function () {
            expect(actual.length).toEqual(3);
        });
        it("propertyが期待値どおりであること", function () {
            var expected = fetchMakerReturnValue[0];
            expect(actual[0]).toMatchObject(expected);
            expect(actual[0]).toHaveProperty("supplis");
        });
    });
    describe("存在しない場合", function () {
        beforeAll(function () {
            fetchMakerReturnValue = [];
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        beforeAll(function () {
            fetchMakerReturnValue = [
                model_1.createMaker(1, "maker1"),
                model_1.createMaker(2, "maker2"),
                model_1.createMaker(3, "maker3")
            ];
            fetchSuppliReturnValue = [
                model_1.createSuppli(100, 10, 1),
                model_1.createSuppli(101, 10, 1),
                model_1.createSuppli(102, 10, 3)
            ];
        });
        it("Suppliが存在する場合はそれが返却されること", function () {
            expect(actual[0].supplis).toHaveLength(2);
            expect(actual[0].supplis[0].id).toEqual(100);
            expect(actual[0].supplis[1].id).toEqual(101);
        });
        it("Suppliが存在しない場合は空配列が返却されること", function () {
            expect(actual[1].supplis).toMatchObject([]);
        });
    });
});
describe("getSuppliAmounts", function () {
    var fetchSuppliReturnValue;
    var fetchSuppliAmountsReturnValue;
    var actual;
    beforeAll(function () {
        fetchSuppliAmountsReturnValue = [
            model_1.createSuppliAmount(1, 11, 101),
            model_1.createSuppliAmount(2, 12, 102),
            model_1.createSuppliAmount(3, 13, 103)
        ];
    });
    beforeEach(function () {
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchSuppliAmount).mockReturnValue(fetchSuppliAmountsReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
        actual = masterRepository.getSuppliAmounts();
    });
    it("SuppliAmountが件数分返却されること", function () {
        expect(actual).toHaveLength(3);
    });
    it("propertyが期待値どおりであること", function () {
        var expected = fetchSuppliAmountsReturnValue[0];
        expect(actual[0]).toMatchObject(expected);
        expect(actual[0]).toHaveProperty("suppli");
    });
    describe("存在しない場合", function () {
        beforeAll(function () {
            fetchSuppliAmountsReturnValue = [];
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        beforeAll(function () {
            fetchSuppliAmountsReturnValue = [model_1.createSuppliAmount(1, 10), model_1.createSuppliAmount(2, 11)];
            fetchSuppliReturnValue = [model_1.createSuppli(10)];
        });
        it("Suppliが存在する場合はそれが返却されること", function () {
            expect(actual[0].suppli.id).toEqual(10);
        });
        it("Suppliが存在しない場合はundefinedが返却されること", function () {
            expect(actual[1].suppli).toBeUndefined();
        });
    });
});
describe("getTimings", function () {
    var fetchTimingReturnValue;
    var fetchIntakeReturnValue;
    var actual;
    beforeAll(function () {
        fetchTimingReturnValue = [
            { id: 1, name: "timing1" },
            { id: 2, name: "timing2" },
            { id: 3, name: "timing3" }
        ];
    });
    beforeEach(function () {
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchTiming).mockReturnValue(fetchTimingReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchIntake).mockReturnValue(fetchIntakeReturnValue);
        actual = masterRepository.getTimings();
    });
    it("Timingが件数分返却されること", function () {
        expect(actual).toHaveLength(3);
    });
    it("propertyが期待値どおりであること", function () {
        var expected = fetchTimingReturnValue[0];
        expect(actual[0]).toMatchObject(expected);
        expect(actual[0]).toHaveProperty("intakes");
    });
    describe("存在しない場合", function () {
        beforeAll(function () {
            fetchTimingReturnValue = [];
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        beforeAll(function () {
            fetchTimingReturnValue = [model_1.createTiming(1), model_1.createTiming(2)];
            fetchIntakeReturnValue = [model_1.createIntake(10, 1), model_1.createIntake(11, 1)];
        });
        it("Intakeが存在する場合はそれが返却されること", function () {
            expect(actual[0].intakes[0].id).toEqual(10);
            expect(actual[0].intakes[1].id).toEqual(11);
        });
        it("Intakeが存在しない場合は空配列が返却されること", function () {
            expect(actual[1].intakes).toEqual([]);
        });
    });
});
describe("getIntakes", function () {
    var fetchIntakeReturnValue;
    var fetchTimingReturnValue;
    var fetchTypeReturnValue;
    var actual;
    beforeAll(function () {
        fetchIntakeReturnValue = [
            model_1.createIntake(1, 10, 100, 5),
            model_1.createIntake(2, 11, 101, 6),
            model_1.createIntake(2, 12, 102, 6)
        ];
    });
    beforeEach(function () {
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchIntake).mockReturnValue(fetchIntakeReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchTiming).mockReturnValue(fetchTimingReturnValue);
        utils_1.mocked(index_1.DummyDatastore.prototype.fetchType).mockReturnValue(fetchTypeReturnValue);
        actual = masterRepository.getIntakes();
    });
    it("Intakeが件数分返却されること", function () {
        expect(actual).toHaveLength(3);
    });
    it("propertyが期待値どおりであること", function () {
        var expected = fetchIntakeReturnValue[0];
        expect(actual[0]).toMatchObject(expected);
        expect(actual[0]).toHaveProperty("type");
        expect(actual[0]).toHaveProperty("timing");
    });
    describe("存在しない場合", function () {
        beforeAll(function () {
            fetchIntakeReturnValue = [];
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        beforeAll(function () {
            fetchIntakeReturnValue = [
                model_1.createIntake(1, 10, 100),
                model_1.createIntake(2, 10, 102),
                model_1.createIntake(3, 12, 102)
            ];
        });
        describe("timing", function () {
            beforeAll(function () {
                fetchTimingReturnValue = [model_1.createTiming(10), model_1.createTiming(11)];
            });
            it("Timingが存在する場合はそれが返却されること", function () {
                expect(actual[0].timing.id).toEqual(10);
            });
            it("Timingが存在しない場合は空配列が返却されること", function () {
                expect(actual[2].timing).toBeUndefined();
            });
        });
        describe("type", function () {
            beforeAll(function () {
                fetchTypeReturnValue = [model_1.createType(101), model_1.createType(102)];
            });
            it("Typeが存在する場合はそれが返却されること", function () {
                expect(actual[1].type.id).toEqual(102);
                expect(actual[2].type.id).toEqual(102);
            });
            it("Timingが存在しない場合は空配列が返却されること", function () {
                expect(actual[0].type).toBeUndefined();
            });
        });
    });
});
describe("updateIntakes", function () {
    var intakes;
    beforeEach(function () {
        masterRepository.updateIntakes(intakes);
    });
    describe("空の配列が渡されたとき", function () {
        beforeAll(function () {
            intakes = [];
        });
        it("datastore.updateIntakesが空の配列で呼び出されること", function () {
            expect(index_1.DummyDatastore.prototype.updateIntakes).toBeCalledWith([]);
        });
    });
    describe("複数のIntakeが指定されたとき", function () {
        var intakeValues = [
            { id: 1, timingId: 10, typeId: 100, serving: 5 },
            { id: 2, timingId: 11, typeId: 101, serving: 6 }
        ];
        beforeAll(function () {
            intakes = [
                new index_2.Intake(intakeValues[0], function () { return masterRepository.getTimingById(1); }, function () { return masterRepository.getTypeById(1); }),
                new index_2.Intake(intakeValues[1], function () { return masterRepository.getTimingById(1); }, function () { return masterRepository.getTypeById(1); })
            ];
        });
        it("datastore.updateIntakesが期待したパラメータで呼び出されること", function () {
            var expected = intakeValues;
            expect(index_1.DummyDatastore.prototype.updateIntakes).toBeCalledWith(expected);
        });
    });
});
//# sourceMappingURL=MasterRepository.test.js.map