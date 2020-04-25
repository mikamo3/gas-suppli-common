import { ISuppliValues, env, PropertyNames } from "../../../src/index";
import { Test, assert, TestSpreadsheetHelper } from "gas-lib/test";

export default () => {
  const masterSpreadsheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty(PropertyNames.mastersheetId)
  );
  Test.run(
    "relation type",
    () => {
      const typeIdBase = 1;
      const typeValues = [
        ["id", "name"],
        [typeIdBase, "type1"],
        [typeIdBase + 1, "type2"]
      ];
      const suppliIdBase = 1000;
      const suppliValues = [
        ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
        [suppliIdBase, typeIdBase, 100, "suppli1", 10, "unit1"],
        [suppliIdBase + 1, typeIdBase, 101, "suppli2", 11, "unit2"]
      ];
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "type", typeValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "suppli", suppliValues);
    },
    () => {
      const repository = env.getMasterRepository();
      const actual = repository.getTypes();
      const typeIdBase = 1;
      const suppliIdBase = 1000;
      const suppliExpected: Pick<ISuppliValues, "id" | "typeId">[] = [
        { id: suppliIdBase, typeId: typeIdBase },
        { id: suppliIdBase + 1, typeId: typeIdBase }
      ];
      assert("1件目のtypeにsuppliが2件紐付いていること").toEqual(actual.length, 2);
      actual[0].supplis.forEach((s, idx) => {
        assert("suppliが存在すること").toMatchObject(s, suppliExpected[idx]);

        assert("suppliからtypeが参照できること").toEqual(s.type.id, actual[0].id);
      });
      assert("2件目のtypeにsuppliが存在しないこと").toEqual(actual[1].supplis, []);
    }
  );
};
