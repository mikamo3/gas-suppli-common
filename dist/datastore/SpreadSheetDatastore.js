"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = require("underscore");
var gas_lib_1 = require("gas-lib");
var intakeColumnPosition = {
    id: 0,
    timingId: 1,
    typeId: 2,
    serving: 3
};
var intakeDatailColumPosition = {
    date: 0,
    timingId: 1,
    suppliId: 2,
    serving: 3
};
var SpreadSheetDatastore = /** @class */ (function () {
    function SpreadSheetDatastore(configure) {
        this.sheetValues = {};
        if (!configure.spreadSheetId) {
            throw Error("configure.spreadSheetId does not found");
        }
        this.spreadSheet = gas_lib_1.Spreadsheet.openById(configure.spreadSheetId);
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
    SpreadSheetDatastore.prototype.fetchForm = function () {
        return this.fetch("form");
    };
    SpreadSheetDatastore.prototype.fetch = function (sheetName) {
        if (!(sheetName in this.sheetValues)) {
            var sheetValues = this.spreadSheet.getAllValues(sheetName);
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
        var intakeArray = intakes.map(function (i) {
            var intakeRow = [];
            for (var position in intakeColumnPosition) {
                intakeRow[intakeColumnPosition[position]] = i[position];
            }
            return intakeRow;
        });
        this.spreadSheet.replace("intake", intakeArray, 1);
    };
    SpreadSheetDatastore.prototype.addIntakeDetails = function (intakeDetails) {
        var intakeDetailArray = intakeDetails.map(function (id) {
            var row = [];
            for (var position in intakeDatailColumPosition) {
                row[intakeDatailColumPosition[position]] = id[position];
            }
            row[0] = id.date.toISOString();
            return row;
        });
        this.spreadSheet.add("intakeDetail", intakeDetailArray);
    };
    return SpreadSheetDatastore;
}());
exports.SpreadSheetDatastore = SpreadSheetDatastore;
//# sourceMappingURL=SpreadSheetDatastore.js.map