"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("datastore/index");
var gas_lib_1 = require("gas-lib");
var utils_1 = require("ts-jest/utils");
var model_1 = require("testhelper/model");
jest.mock("gas-lib");
var getAllValuesRV;
var spreadSheetDatastore;
var configure;
beforeAll(function () {
    configure = { spreadSheetId: "" };
    getAllValuesRV = [];
});
beforeEach(function () {
    utils_1.mocked(gas_lib_1.Spreadsheet.openById).mockReturnValue({
        getAllValues: gas_lib_1.Spreadsheet.prototype.getAllValues,
        replace: gas_lib_1.Spreadsheet.prototype.replace
    });
    utils_1.mocked(gas_lib_1.Spreadsheet.prototype.getAllValues).mockReturnValue(getAllValuesRV);
    spreadSheetDatastore = new index_1.SpreadSheetDatastore(configure);
});
afterEach(function () {
    jest.clearAllMocks();
});
describe("スプレッドシートの操作確認", function () {
    beforeAll(function () {
        configure = { spreadSheetId: "hoge" };
    });
    beforeEach(function () {
        new index_1.SpreadSheetDatastore(configure);
    });
    it("指定したIDのスプレッドシートが開かれること", function () {
        expect(gas_lib_1.Spreadsheet.openById).toBeCalledWith("hoge");
    });
});
describe("キャッシュの確認", function () {
    var sheetValues = [
        ["id", "name"],
        [1, "maker1"],
        [2, "maker2"]
    ];
    beforeAll(function () {
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        spreadSheetDatastore.fetchMaker();
        spreadSheetDatastore.fetchMaker();
    });
    it("spreadSheetのAPIが1度のみよばれること", function () {
        expect(gas_lib_1.Spreadsheet.prototype.getAllValues).toBeCalledTimes(1);
    });
});
describe("取得結果が存在しない場合", function () {
    var actual;
    beforeAll(function () {
        getAllValuesRV = [["foo", "bar"]];
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchMaker();
    });
    it("空配列が返却されること", function () {
        expect(actual).toEqual([]);
    });
});
describe("fetchMaker", function () {
    var sheetValues = [
        ["id", "name"],
        [1, "maker1"],
        [2, "maker2"]
    ];
    var actual;
    beforeAll(function () {
        configure = { spreadSheetId: "hogehoge" };
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchMaker();
    });
    it("Spreadsheet.prototype.getAllValuesが呼び出されること", function () {
        expect(gas_lib_1.Spreadsheet.prototype.getAllValues).toBeCalledWith("maker");
    });
    it("MakerValuesが件数分返却されること", function () {
        var expected = [
            { id: 1, name: "maker1" },
            { id: 2, name: "maker2" }
        ];
        expect(actual).toEqual(expected);
    });
});
describe("fetchIntake", function () {
    var sheetValues = [
        ["id", "timingId", "typeId", "serving"],
        [1, 10, 100, 5],
        [2, 11, 101, 6],
        [3, 12, 102, 7]
    ];
    var actual;
    beforeAll(function () {
        configure = { spreadSheetId: "hogehoge" };
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchIntake();
    });
    it("IntakeValuesが件数分返却されること", function () {
        var expected = [
            { id: 1, timingId: 10, typeId: 100, serving: 5 },
            { id: 2, timingId: 11, typeId: 101, serving: 6 },
            { id: 3, timingId: 12, typeId: 102, serving: 7 }
        ];
        expect(actual).toEqual(expected);
    });
});
describe("fetchSuppli", function () {
    var sheetValues = [
        ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
        [1, 10, 100, "suppli1", 5, "unit1"],
        [2, 11, 101, "suppli2", 6, "unit2"],
        [3, 12, 102, "suppli3", 7, "unit3"]
    ];
    var actual;
    beforeAll(function () {
        configure = { spreadSheetId: "hogehoge" };
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchSuppli();
    });
    it("SuppliValuesが件数分返却されること", function () {
        var expected = [
            {
                id: 1,
                typeId: 10,
                makerId: 100,
                name: "suppli1",
                amountPerServing: 5,
                servingUnit: "unit1"
            },
            {
                id: 2,
                typeId: 11,
                makerId: 101,
                name: "suppli2",
                amountPerServing: 6,
                servingUnit: "unit2"
            },
            {
                id: 3,
                typeId: 12,
                makerId: 102,
                name: "suppli3",
                amountPerServing: 7,
                servingUnit: "unit3"
            }
        ];
        expect(actual).toEqual(expected);
    });
});
describe("fetchSuppliAmount", function () {
    var sheetValues = [
        ["id", "suppliId", "amount"],
        [1, 10, 100],
        [2, 11, 101],
        [3, 12, 102]
    ];
    var actual;
    beforeAll(function () {
        configure = { spreadSheetId: "hogehoge" };
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchSuppliAmount();
    });
    it("SuppliAmountValuesが件数分返却されること", function () {
        var expected = [
            { id: 1, suppliId: 10, amount: 100 },
            { id: 2, suppliId: 11, amount: 101 },
            { id: 3, suppliId: 12, amount: 102 }
        ];
        expect(actual).toEqual(expected);
    });
});
describe("fetchTiming", function () {
    var sheetValues = [
        ["id", "name"],
        [1, "timing1"],
        [2, "timing2"]
    ];
    var actual;
    beforeAll(function () {
        configure = { spreadSheetId: "hogehoge" };
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchTiming();
    });
    it("TimingValuesが件数分返却されること", function () {
        var expected = [
            { id: 1, name: "timing1" },
            { id: 2, name: "timing2" }
        ];
        expect(actual).toEqual(expected);
    });
});
describe("fetchType", function () {
    var sheetValues = [
        ["id", "name"],
        [1, "type1"],
        [2, "type2"]
    ];
    var actual;
    beforeAll(function () {
        configure = { spreadSheetId: "hogehoge" };
        getAllValuesRV = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchType();
    });
    it("TypeValuesが件数分返却されること", function () {
        var expected = [
            { id: 1, name: "type1" },
            { id: 2, name: "type2" }
        ];
        expect(actual).toEqual(expected);
    });
});
describe("updateIntakes", function () {
    var intakes;
    beforeAll(function () {
        intakes = [];
    });
    beforeEach(function () {
        spreadSheetDatastore.fetchIntake();
        spreadSheetDatastore.updateIntakes(intakes);
    });
    describe("実行後のfetchIntakeを実行した際", function () {
        beforeEach(function () {
            spreadSheetDatastore.fetchIntake();
        });
        it("キャッシュが使われないこと", function () {
            expect(gas_lib_1.Spreadsheet.prototype.getAllValues).toBeCalledTimes(2);
        });
    });
    describe("任意の値が指定された場合", function () {
        beforeAll(function () {
            intakes = [
                model_1.createIntake(1, 10, 30, 5),
                model_1.createIntake(2, 11, 31, 6),
                model_1.createIntake(3, 12, 32, 7)
            ];
        });
        it("件数分データが追加されること", function () {
            var expected = [
                [1, 10, 30, 5],
                [2, 11, 31, 6],
                [3, 12, 32, 7]
            ];
            expect(gas_lib_1.Spreadsheet.prototype.replace).toBeCalledWith("intake", expected, 1);
        });
    });
});
//# sourceMappingURL=SpreadSheetDatastore.test.js.map