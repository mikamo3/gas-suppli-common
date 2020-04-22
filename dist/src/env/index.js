"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("repository/index");
var index_2 = require("datastore/index");
var index_3 = require("constant/index");
var getEnv = function () {
    var stage = process.env.NODE_ENV;
    if (stage !== "test" && stage !== "production" && stage !== "development") {
        throw new Error("invalid NODE_ENV: " + stage);
    }
    return stage;
};
var createMasterRepository = function () {
    var spreadSheetId = PropertiesService.getScriptProperties().getProperty(index_3.PropertyNames.mastersheetId);
    if (!spreadSheetId) {
        throw new Error("spreadSheet does not exist");
    }
    return new index_1.MasterRepository(new index_2.SpreadSheetDatastore({ spreadSheetId: spreadSheetId }));
};
exports.env = {
    masterRepository: (function () {
        var stage = getEnv();
        switch (stage) {
            case "test":
                return new index_1.MasterRepository(new index_2.DummyDatastore({}));
            case "development":
                return createMasterRepository();
            case "production": {
                return createMasterRepository();
            }
        }
    })()
};
//# sourceMappingURL=index.js.map