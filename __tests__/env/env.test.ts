import { env } from "env/index";
import { DummyDatastore } from "datastore/index";

jest.mock("datastore/index");
describe("test環境の確認", () => {
  describe("masterRepository", () => {
    beforeEach(() => {
      env.getMasterRepository();
    });
    it("DummyDatastoreがInjectionされたMasterRepositoryが返却されること", () => {
      expect(DummyDatastore).toBeCalled();
    });
  });
});
