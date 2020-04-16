"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("datastore/index");
var MockSheet_1 = __importDefault(require("mocks/gas/MockSheet"));
var MockRange_1 = __importDefault(require("mocks/gas/MockRange"));
var MockSpreadSheet_1 = __importDefault(require("mocks/gas/MockSpreadSheet"));
var utils_1 = require("ts-jest/utils");
var model_1 = require("testhelper/model");
var openById = jest.fn();
var spreadSheetValues;
var spreadSheetDatastore;
var configure;
SpreadsheetApp.openById = openById;
beforeAll(function () {
    configure = { spreadSheetId: "" };
    spreadSheetValues = [];
});
beforeEach(function () {
    openById.mockReturnValue(new MockSpreadSheet_1.default(spreadSheetValues));
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
        spreadSheetDatastore.fetchMaker();
    });
    it("指定したIDのスプレッドシートが開かれること", function () {
        expect(openById).toBeCalledWith("hoge");
    });
});
describe("キャッシュの確認", function () {
    var sheetValues = [
        ["id", "name"],
        [1, "maker1"],
        [2, "maker2"]
    ];
    beforeAll(function () {
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        spreadSheetDatastore.fetchMaker();
        spreadSheetDatastore.fetchMaker();
    });
    it("spreadSheetのAPIが1度のみよばれること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledTimes(1);
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalledTimes(1);
        expect(MockRange_1.default.prototype.getValues).toBeCalledTimes(1);
    });
});
describe("取得結果が存在しない場合", function () {
    var actual;
    beforeAll(function () {
        spreadSheetValues = [];
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
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchMaker();
    });
    it("指定したspreadSheetが開かれること", function () {
        expect(openById).toBeCalledWith("hogehoge");
    });
    it("makerシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("maker");
    });
    it("シート内のすべてのデータが選択されること", function () {
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalled();
    });
    it("選択されたデータが取得されること", function () {
        expect(MockRange_1.default.prototype.getValues).toReturnWith(sheetValues);
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
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchIntake();
    });
    it("指定したspreadSheetが開かれること", function () {
        expect(openById).toBeCalledWith("hogehoge");
    });
    it("intakeシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("intake");
    });
    it("シート内のすべてのデータが選択されること", function () {
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalled();
    });
    it("選択されたデータが取得されること", function () {
        expect(MockRange_1.default.prototype.getValues).toReturnWith(sheetValues);
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
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchSuppli();
    });
    it("指定したspreadSheetが開かれること", function () {
        expect(openById).toBeCalledWith("hogehoge");
    });
    it("suppliシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("suppli");
    });
    it("シート内のすべてのデータが選択されること", function () {
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalled();
    });
    it("選択されたデータが取得されること", function () {
        expect(MockRange_1.default.prototype.getValues).toReturnWith(sheetValues);
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
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchSuppliAmount();
    });
    it("指定したspreadSheetが開かれること", function () {
        expect(openById).toBeCalledWith("hogehoge");
    });
    it("suppliAmountシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("suppliAmount");
    });
    it("シート内のすべてのデータが選択されること", function () {
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalled();
    });
    it("選択されたデータが取得されること", function () {
        expect(MockRange_1.default.prototype.getValues).toReturnWith(sheetValues);
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
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchTiming();
    });
    it("指定したspreadSheetが開かれること", function () {
        expect(openById).toBeCalledWith("hogehoge");
    });
    it("timingシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("timing");
    });
    it("シート内のすべてのデータが選択されること", function () {
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalled();
    });
    it("選択されたデータが取得されること", function () {
        expect(MockRange_1.default.prototype.getValues).toReturnWith(sheetValues);
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
        spreadSheetValues = sheetValues;
    });
    beforeEach(function () {
        actual = spreadSheetDatastore.fetchType();
    });
    it("指定したspreadSheetが開かれること", function () {
        expect(openById).toBeCalledWith("hogehoge");
    });
    it("typeシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("type");
    });
    it("シート内のすべてのデータが選択されること", function () {
        expect(MockSheet_1.default.prototype.getDataRange).toBeCalled();
    });
    it("選択されたデータが取得されること", function () {
        expect(MockRange_1.default.prototype.getValues).toReturnWith(sheetValues);
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
    var lastRow = 10;
    beforeAll(function () {
        intakes = [];
    });
    beforeEach(function () {
        utils_1.mocked(MockSheet_1.default.prototype.getLastRow).mockReturnValue(lastRow);
        spreadSheetDatastore.fetchIntake();
        spreadSheetDatastore.updateIntakes(intakes);
    });
    it("intakeシートが選択されること", function () {
        expect(MockSpreadSheet_1.default.prototype.getSheetByName).toBeCalledWith("intake");
    });
    it("データが存在する末尾の行が取得されること", function () {
        expect(MockSheet_1.default.prototype.getLastRow).toBeCalled();
    });
    it("2行目以降のデータの行が削除されること", function () {
        expect(MockSheet_1.default.prototype.deleteRows).toBeCalledWith(2, 9);
    });
    describe("実行後のfetchIntakeを実行した際", function () {
        beforeEach(function () {
            spreadSheetDatastore.fetchIntake();
        });
        it("キャッシュが使われないこと", function () {
            expect(MockRange_1.default.prototype.getValues).toBeCalledTimes(2);
        });
    });
    describe("空配列が指定された場合", function () {
        beforeAll(function () {
            intakes = [];
        });
        it("データの追加が行われないこと", function () {
            expect(MockSheet_1.default.prototype.insertRowsAfter).not.toBeCalled();
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
        it("件数分2行目以降にデータが追加されること", function () {
            var expected = [
                [1, 10, 30, 5],
                [2, 11, 31, 6],
                [3, 12, 32, 7]
            ];
            expect(MockSheet_1.default.prototype.insertRowsAfter).toBeCalledWith(1, 3);
            expect(MockSheet_1.default.prototype.getRange).toBeCalledWith(2, 1, 3, 4);
            expect(MockRange_1.default.prototype.setValues).toBeCalledWith(expected);
        });
    });
});
//# sourceMappingURL=SpreadSheetDatastore.test.js.map