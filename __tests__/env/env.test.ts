import { repository } from "env/index";
import { DummyDatastore } from "datastore/index";

jest.mock("datastore/index");
describe("test環境の確認", () => {
  describe("masterRepository", () => {
    beforeEach(() => {
      repository();
    });
    it("DummyDatastoreがInjectionされたMasterRepositoryが返却されること", () => {
      expect(DummyDatastore).toBeCalled();
    });
  });
});
