"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = require("underscore");
var intakeColumnPosition = {
    id: 0,
    timingId: 1,
    typeId: 2,
    serving: 3
};
var SpreadSheetDatastore = /** @class */ (function () {
    function SpreadSheetDatastore(configure) {
        this.sheetValues = {};
        this.spreadSheet = SpreadsheetApp.openById(configure.spreadSheetId);
    }
    SpreadSheetDatastore.prototype.fetchMaker = function () {
        return this.fetch("maker");
    };
    SpreadSheetDatastore.prototype.fetchIntake = function () {
        return this.fetch("intake");
    };
    SpreadSheetDatastore.prototype.fetchSuppli = function () {
        return this.fetch("suppli");
    };
    SpreadSheetDatastore.prototype.fetchSuppliAmount = function () {
        return this.fetch("suppliAmount");
    };
    SpreadSheetDatastore.prototype.fetchTiming = function () {
        return this.fetch("timing");
    };
    SpreadSheetDatastore.prototype.fetchType = function () {
        return this.fetch("type");
    };
    SpreadSheetDatastore.prototype.fetch = function (sheetName) {
        if (!(sheetName in this.sheetValues)) {
            var sheetValues = this.spreadSheet
                .getSheetByName(sheetName)
                .getDataRange()
                .getValues();
            this.sheetValues[sheetName] = sheetValues;
        }
        if (this.sheetValues[sheetName].length === 0) {
            return [];
        }
        var dataPosition = this.getDataPosition(this.sheetValues[sheetName]);
        return this.convertModelValues(dataPosition, this.sheetValues[sheetName]);
    };
    SpreadSheetDatastore.prototype.getDataPosition = function (sheetValues) {
        var header = sheetValues[0];
        return header.reduce(function (prev, cur, idx) {
            prev[cur] = idx;
            return prev;
        }, {});
    };
    SpreadSheetDatastore.prototype.convertModelValues = function (dataPosition, sheetValues) {
        var values = underscore_1.filter(sheetValues, function (_, idx) { return idx !== 0; });
        return values.map(function (value) {
            var obj = {};
            for (var k in dataPosition) {
                obj[k] = value[dataPosition[k]];
            }
            return obj;
        }, []);
    };
    SpreadSheetDatastore.prototype.updateIntakes = function (intakes) {
        delete this.sheetValues["intake"];
        var sheet = this.spreadSheet.getSheetByName("intake");
        var lastRow = sheet.getLastRow();
        sheet.deleteRows(2, lastRow - 1);
        if (intakes.length !== 0) {
            var intakeArray = intakes.map(function (i) {
                var intakeRow = [];
                for (var position in intakeColumnPosition) {
                    intakeRow[intakeColumnPosition[position]] = i[position];
                }
                return intakeRow;
            });
            sheet.insertRowsAfter(1, intakes.length);
            var range = sheet.getRange(2, 1, intakeArray.length, intakeArray[0].length);
            range.setValues(intakeArray);
        }
    };
    return SpreadSheetDatastore;
}());
exports.SpreadSheetDatastore = SpreadSheetDatastore;
//# sourceMappingURL=SpreadSheetDatastore.js.map