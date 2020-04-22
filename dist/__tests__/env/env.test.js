"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("env/index");
var index_2 = require("datastore/index");
jest.mock("datastore/index");
describe("test環境の確認", function () {
    describe("masterRepository", function () {
        beforeEach(function () {
            index_1.env.masterRepository;
        });
        it("DummyDatastoreがInjectionされたMasterRepositoryが返却されること", function () {
            expect(index_2.DummyDatastore).toBeCalled();
        });
    });
});
//# sourceMappingURL=env.test.js.map