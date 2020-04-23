"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../src/index");
var spreadsheet_1 = require("../spreadsheet");
var common_1 = require("./common");
exports.default = (function (spreadSheet) {
    common_1.testMasterRepository("relation type", spreadSheet, function (spreadsheet) {
        var typeIdBase = 1;
        var typeValues = [
            ["id", "name"],
            [typeIdBase, "type1"],
            [typeIdBase + 1, "type2"]
        ];
        var suppliIdBase = 1000;
        var suppliValues = [
            ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
            [suppliIdBase, typeIdBase, 100, "suppli1", 10, "unit1"],
            [suppliIdBase + 1, typeIdBase, 101, "suppli2", 11, "unit2"]
        ];
        spreadsheet_1.setTestdata(spreadsheet, "type", typeValues);
        spreadsheet_1.setTestdata(spreadsheet, "suppli", suppliValues);
    }, function () {
        var repository = index_1.env.getMasterRepository();
        var actual = repository.getTypes();
        var typeIdBase = 1;
        var suppliIdBase = 1000;
        var suppliExpected = [
            { id: suppliIdBase, typeId: typeIdBase },
            { id: suppliIdBase + 1, typeId: typeIdBase }
        ];
        common_1.assert("1件目のtypeにsuppliが2件紐付いていること").toEqual(actual.length, 2);
        actual[0].supplis.forEach(function (s, idx) {
            common_1.assert("suppliが存在すること").toMatchObject(s, suppliExpected[idx]);
            common_1.assert("suppliからtypeが参照できること").toEqual(s.type.id, actual[0].id);
        });
        common_1.assert("2件目のtypeにsuppliが存在しないこと").toEqual(actual[1].supplis, []);
    });
});
//# sourceMappingURL=testRelationType.js.map