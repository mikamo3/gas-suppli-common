"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MockDatastore_1 = __importStar(require("mocks/datastore/MockDatastore"));
var index_1 = require("model/index");
var index_2 = require("repository/index");
var masterRepository;
var datastore;
MockDatastore_1.init();
beforeEach(function () {
    datastore = new MockDatastore_1.default();
    masterRepository = new index_2.MasterRepository(datastore);
});
afterEach(function () {
    jest.clearAllMocks();
});
describe("getTypes", function () {
    var actual;
    beforeEach(function () {
        actual = masterRepository.getTypes();
    });
    describe("複数件の場合", function () {
        var fetchTypeReturnValue = [
            MockDatastore_1.createType(1, "type1"),
            MockDatastore_1.createType(2, "type2"),
            MockDatastore_1.createType(3, "type3")
        ];
        beforeAll(function () {
            MockDatastore_1.setFetchTypeReturnValue(fetchTypeReturnValue);
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
        var fetchTypeReturnValue = [];
        beforeAll(function () {
            MockDatastore_1.setFetchTypeReturnValue(fetchTypeReturnValue);
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        var fetchTypeReturnValue = [
            MockDatastore_1.createType(1, "type1"),
            MockDatastore_1.createType(2, "type2"),
            MockDatastore_1.createType(3, "type3")
        ];
        beforeAll(function () {
            MockDatastore_1.setFetchTypeReturnValue(fetchTypeReturnValue);
        });
        describe("supplis", function () {
            var fetchSuppliReturnValue = [
                MockDatastore_1.createSuppli(100, 1),
                MockDatastore_1.createSuppli(101, 1),
                MockDatastore_1.createSuppli(102, 3)
            ];
            beforeAll(function () {
                MockDatastore_1.setFetchSuppliReturnValue(fetchSuppliReturnValue);
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
            var fetchIntakeReturnValue = [
                MockDatastore_1.createIntake(10, 10, 1, 5),
                MockDatastore_1.createIntake(11, 11, 1, 6),
                MockDatastore_1.createIntake(12, 12, 3, 7)
            ];
            beforeAll(function () {
                MockDatastore_1.setFetchIntakeReturnValue(fetchIntakeReturnValue);
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
    var fetchSuppliReturnValue = [
        MockDatastore_1.createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
        MockDatastore_1.createSuppli(2, 11, 101, "suppli2", 11, "unit2")
    ];
    var actual;
    beforeAll(function () {
        MockDatastore_1.setFetchSuppliReturnValue(fetchSuppliReturnValue);
    });
    beforeEach(function () {
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
            MockDatastore_1.setFetchSuppliReturnValue([]);
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        var fetchSuppliReturnValue = [
            MockDatastore_1.createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
            MockDatastore_1.createSuppli(2, 11, 101, "suppli2", 11, "unit2")
        ];
        beforeAll(function () {
            MockDatastore_1.setFetchSuppliReturnValue(fetchSuppliReturnValue);
        });
        describe("type", function () {
            var fetchTypeReturnValue = [
                MockDatastore_1.createType(10, "type1"),
                MockDatastore_1.createType(12, "type2")
            ];
            beforeAll(function () {
                MockDatastore_1.setFetchTypeReturnValue(fetchTypeReturnValue);
            });
            it("Suppliが存在する場合はそれが返却されること", function () {
                expect(actual[0].type).toMatchObject(fetchTypeReturnValue[0]);
            });
            it("Suppliが存在しない場合はundefinedが返却されること", function () {
                expect(actual[1].type).toBeUndefined();
            });
        });
        describe("maker", function () {
            var fetchMakerReturnValue = [MockDatastore_1.createMaker(101), MockDatastore_1.createMaker(102)];
            beforeAll(function () {
                MockDatastore_1.setFetchMakerReturnValue(fetchMakerReturnValue);
            });
            it("Makerが存在する場合はそれが返却されること", function () {
                expect(actual[1].maker).toMatchObject(fetchMakerReturnValue[0]);
            });
            it("Makerが存在しない場合はundefinedが返却されること", function () {
                expect(actual[0].maker).toBeUndefined();
            });
        });
        describe("suppliAmounts", function () {
            var fetchSuppliAmountReturnValue = [
                MockDatastore_1.createSuppliAmount(1000, 1),
                MockDatastore_1.createSuppliAmount(1001, 1),
                MockDatastore_1.createSuppliAmount(1002, 3)
            ];
            beforeAll(function () {
                MockDatastore_1.setFetchSuppliAmountReturnValue(fetchSuppliAmountReturnValue);
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
    beforeEach(function () {
        actual = masterRepository.getMakers();
    });
    describe("複数件の場合", function () {
        var fetchMakerReturnValue = [
            MockDatastore_1.createMaker(1, "maker1"),
            MockDatastore_1.createMaker(2, "maker2"),
            MockDatastore_1.createMaker(3, "maker3")
        ];
        beforeAll(function () {
            MockDatastore_1.setFetchMakerReturnValue(fetchMakerReturnValue);
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
        var fetchMakerReturnValue = [];
        beforeAll(function () {
            MockDatastore_1.setFetchMakerReturnValue(fetchMakerReturnValue);
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        var fetchMakerReturnValue = [
            MockDatastore_1.createMaker(1, "maker1"),
            MockDatastore_1.createMaker(2, "maker2"),
            MockDatastore_1.createMaker(3, "maker3")
        ];
        var fetchSuppliReturnValue = [
            MockDatastore_1.createSuppli(100, 10, 1),
            MockDatastore_1.createSuppli(101, 10, 1),
            MockDatastore_1.createSuppli(102, 10, 3)
        ];
        beforeAll(function () {
            MockDatastore_1.setFetchMakerReturnValue(fetchMakerReturnValue);
            MockDatastore_1.setFetchSuppliReturnValue(fetchSuppliReturnValue);
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
    var fetchSuppliAmountsReturnValue = [
        MockDatastore_1.createSuppliAmount(1, 11, 101),
        MockDatastore_1.createSuppliAmount(2, 12, 102),
        MockDatastore_1.createSuppliAmount(3, 13, 103)
    ];
    var actual;
    beforeAll(function () {
        MockDatastore_1.setFetchSuppliAmountReturnValue(fetchSuppliAmountsReturnValue);
    });
    beforeEach(function () {
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
            MockDatastore_1.setFetchSuppliAmountReturnValue([]);
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        var fetchSuppliAmountsReturnValue = [
            MockDatastore_1.createSuppliAmount(1, 10),
            MockDatastore_1.createSuppliAmount(2, 11)
        ];
        var fetchSuppliReturnValue = [MockDatastore_1.createSuppli(10)];
        beforeAll(function () {
            MockDatastore_1.setFetchSuppliAmountReturnValue(fetchSuppliAmountsReturnValue);
            MockDatastore_1.setFetchSuppliReturnValue(fetchSuppliReturnValue);
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
    var fetchTimingReturnValue = [
        { id: 1, name: "timing1" },
        { id: 2, name: "timing2" },
        { id: 3, name: "timing3" }
    ];
    var actual;
    beforeAll(function () {
        MockDatastore_1.setFetchTimingReturnValue(fetchTimingReturnValue);
    });
    beforeEach(function () {
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
            MockDatastore_1.setFetchTimingReturnValue([]);
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        var fetchTimingReturnValue = [MockDatastore_1.createTiming(1), MockDatastore_1.createTiming(2)];
        var fetchIntakeReturnValue = [MockDatastore_1.createIntake(10, 1), MockDatastore_1.createIntake(11, 1)];
        beforeAll(function () {
            MockDatastore_1.setFetchTimingReturnValue(fetchTimingReturnValue);
            MockDatastore_1.setFetchIntakeReturnValue(fetchIntakeReturnValue);
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
    var fetchIntakeReturnValue = [
        MockDatastore_1.createIntake(1, 10, 100, 5),
        MockDatastore_1.createIntake(2, 11, 101, 6),
        MockDatastore_1.createIntake(2, 12, 102, 6)
    ];
    var actual;
    beforeAll(function () {
        MockDatastore_1.setFetchIntakeReturnValue(fetchIntakeReturnValue);
    });
    beforeEach(function () {
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
            MockDatastore_1.setFetchIntakeReturnValue([]);
        });
        it("空配列が返却されること", function () {
            expect(actual).toEqual([]);
        });
    });
    describe("relationの確認", function () {
        var fetchIntakeReturnValue = [
            MockDatastore_1.createIntake(1, 10, 100),
            MockDatastore_1.createIntake(2, 10, 102),
            MockDatastore_1.createIntake(3, 12, 102)
        ];
        beforeAll(function () {
            MockDatastore_1.setFetchIntakeReturnValue(fetchIntakeReturnValue);
        });
        describe("timing", function () {
            var fetchTimingReturnValue = [MockDatastore_1.createTiming(10), MockDatastore_1.createTiming(11)];
            beforeAll(function () {
                MockDatastore_1.setFetchTimingReturnValue(fetchTimingReturnValue);
            });
            it("Timingが存在する場合はそれが返却されること", function () {
                expect(actual[0].timing.id).toEqual(10);
            });
            it("Timingが存在しない場合は空配列が返却されること", function () {
                expect(actual[2].timing).toBeUndefined();
            });
        });
        describe("type", function () {
            var fetchTypeReturnValue = [MockDatastore_1.createType(101), MockDatastore_1.createType(102)];
            beforeAll(function () {
                MockDatastore_1.setFetchTypeReturnValue(fetchTypeReturnValue);
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
            expect(MockDatastore_1.updateIntakes).toBeCalledWith([]);
        });
    });
    describe("複数のIntakeが指定されたとき", function () {
        var intakeValues = [
            { id: 1, timingId: 10, typeId: 100, serving: 5 },
            { id: 2, timingId: 11, typeId: 101, serving: 6 }
        ];
        beforeAll(function () {
            intakes = [
                new index_1.Intake(intakeValues[0], function () { return masterRepository.getTimingById(1); }, function () { return masterRepository.getTypeById(1); }),
                new index_1.Intake(intakeValues[1], function () { return masterRepository.getTimingById(1); }, function () { return masterRepository.getTypeById(1); })
            ];
        });
        it("datastore.updateIntakesが期待したパラメータで呼び出されること", function () {
            var expected = intakeValues;
            expect(MockDatastore_1.updateIntakes).toBeCalledWith(expected);
        });
    });
});
//# sourceMappingURL=MasterRepository.test.js.map