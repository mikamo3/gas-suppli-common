"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var spreadsheet_1 = require("../spreadsheet");
var src_1 = require("../../../src");
exports.default = (function (spreadSheet) {
    common_1.testMasterRepository("updateIntakes", spreadSheet, function (spreadsheet) {
        var intakeValues = [
            ["id", "timingId", "typeId", "serving"],
            [1, 10, 100, 0.1],
            [2, 11, 101, 0.2]
        ];
        spreadsheet_1.setTestdata(spreadsheet, "intake", intakeValues);
    }, function () {
        var assertReturnValue = function (actual, expected) {
            actual.forEach(function (a, idx) {
                return common_1.assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx]);
            });
            common_1.assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
        };
        var testSpreadSheetId = PropertiesService.getScriptProperties().getProperty("testSpreadSheetId");
        var dataStore = src_1.createDatastore(src_1.SpreadSheetDatastore, { spreadSheetId: testSpreadSheetId });
        var repository = new src_1.MasterRepository(dataStore);
        var expectedIntakeValues = [
            { id: 1, timingId: 10, typeId: 100, serving: 0.1 },
            { id: 2, timingId: 11, typeId: 101, serving: 0.2 }
        ];
        assertReturnValue(repository.getIntakes(), expectedIntakeValues);
        var updateIntakeValues = [
            { id: 1, timingId: 10, typeId: 100, serving: 0.1 },
            { id: 2, timingId: 11, typeId: 101, serving: 0.2 },
            { id: 3, timingId: 12, typeId: 102, serving: 0.3 },
            { id: 4, timingId: 13, typeId: 103, serving: 0.4 }
        ];
        dataStore.updateIntakes(updateIntakeValues);
        var expectedIntakeValuesAfterUpdate = updateIntakeValues;
        assertReturnValue(repository.getIntakes(), expectedIntakeValuesAfterUpdate);
    });
});
//# sourceMappingURL=testUpdateIntakes.js.map