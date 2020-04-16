"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../src/index");
var spreadsheet_1 = require("../spreadsheet");
var common_1 = require("./common");
exports.default = (function (spreadSheet) {
    common_1.testMasterRepository("masterData", spreadSheet, function (spreadsheet) {
        var typeValues = [
            ["id", "name"],
            [1, "type1"],
            [2, "type2"]
        ];
        var timingValues = [
            ["id", "name"],
            [10, "timing1"],
            [20, "timing2"],
            [30, "timing3"]
        ];
        var makerValues = [
            ["id", "name"],
            [100, "maker1"],
            [200, "maker2"],
            [300, "maker3"]
        ];
        var suppliValues = [
            ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
            [1000, 1, 100, "suppli1", 5, "unit1"],
            [2000, 2, 101, "suppli2", 6, "unit2"]
        ];
        var suppliAmountValues = [
            ["id", "suppliId", "amount"],
            [1, 10, 5],
            [2, 11, 6]
        ];
        var intakeValues = [
            ["id", "timingId", "typeId", "serving"],
            [1, 10, 100, 0.1],
            [2, 11, 101, 0.2]
        ];
        spreadsheet_1.setTestdata(spreadsheet, "type", typeValues);
        spreadsheet_1.setTestdata(spreadsheet, "timing", timingValues);
        spreadsheet_1.setTestdata(spreadsheet, "maker", makerValues);
        spreadsheet_1.setTestdata(spreadsheet, "suppli", suppliValues);
        spreadsheet_1.setTestdata(spreadsheet, "suppliAmount", suppliAmountValues);
        spreadsheet_1.setTestdata(spreadsheet, "intake", intakeValues);
    }, function () {
        var assertReturnValue = function (actual, expected) {
            actual.forEach(function (a, idx) {
                return common_1.assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx]);
            });
            common_1.assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
        };
        var testSpreadSheetId = PropertiesService.getScriptProperties().getProperty("testSpreadSheetId");
        var dataStore = index_1.createDatastore(index_1.SpreadSheetDatastore, { spreadSheetId: testSpreadSheetId });
        var repository = new index_1.MasterRepository(dataStore);
        var expectedType = [
            { id: 1, name: "type1" },
            { id: 2, name: "type2" }
        ];
        assertReturnValue(repository.getTypes(), expectedType);
        var expectedTiming = [
            { id: 10, name: "timing1" },
            { id: 20, name: "timing2" },
            { id: 30, name: "timing3" }
        ];
        assertReturnValue(repository.getTimings(), expectedTiming);
        var expectedMaker = [
            { id: 100, name: "maker1" },
            { id: 200, name: "maker2" },
            { id: 300, name: "maker3" }
        ];
        assertReturnValue(repository.getMakers(), expectedMaker);
        var expectedSuppliValues = [
            {
                id: 1000,
                typeId: 1,
                makerId: 100,
                name: "suppli1",
                amountPerServing: 5,
                servingUnit: "unit1"
            },
            {
                id: 2000,
                typeId: 2,
                makerId: 101,
                name: "suppli2",
                amountPerServing: 6,
                servingUnit: "unit2"
            }
        ];
        assertReturnValue(repository.getSupplis(), expectedSuppliValues);
        var expectedSuppliAmountValues = [
            { id: 1, suppliId: 10, amount: 5 },
            { id: 2, suppliId: 11, amount: 6 }
        ];
        assertReturnValue(repository.getSuppliAmounts(), expectedSuppliAmountValues);
        var expectedIntakeValues = [
            { id: 1, timingId: 10, typeId: 100, serving: 0.1 },
            { id: 2, timingId: 11, typeId: 101, serving: 0.2 }
        ];
        assertReturnValue(repository.getIntakes(), expectedIntakeValues);
    });
});
//# sourceMappingURL=testMasterdata.js.map