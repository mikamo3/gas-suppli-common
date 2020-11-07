"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../repository/index");
var index_2 = require("../datastore/index");
var index_3 = require("../constant/index");
var Log_1 = require("gas-lib/Log");
var getEnv = function () {
    var stage = process.env.NODE_ENV;
    if (stage !== "test" && stage !== "production" && stage !== "development") {
        throw new Error("invalid NODE_ENV: " + stage);
    }
    return stage;
};
var createMasterRepositoryWithSpreadSheetDatastore = function () {
    var spreadSheetId = PropertiesService.getScriptProperties().getProperty(index_3.PropertyNames.mastersheetId);
    if (!spreadSheetId) {
        throw new Error("spreadSheet does not exist");
    }
    return new index_1.MasterRepository(new index_2.SpreadSheetDatastore({ spreadSheetId: spreadSheetId }));
};
exports.repository = function () {
    var stage = getEnv();
    switch (stage) {
        case "test":
            return new index_1.MasterRepository(new index_2.DummyDatastore({}));
        case "development":
            return createMasterRepositoryWithSpreadSheetDatastore();
        case "production": {
            return createMasterRepositoryWithSpreadSheetDatastore();
        }
    }
};
exports.logger = function () {
    var stage = getEnv();
    switch (stage) {
        case "test":
            Log_1.logInstance.setConfig({ logwriter: Log_1.consoleLogWriter, mode: stage, useBuffer: true });
            break;
        case "development":
            Log_1.logInstance.setConfig({ logwriter: Log_1.gasLogWriter, mode: stage, useBuffer: true });
            break;
        case "production":
            Log_1.logInstance.setConfig({ logwriter: Log_1.gasLogWriter, mode: stage, useBuffer: false });
    }
    return Log_1.logInstance;
};
//# sourceMappingURL=index.js.map