import {
  env,
  PropertyNames,
  createSuppliValues,
  createTypeValues,
  createTypeSheet,
  createSuppliSheet
} from "../../../src/index";
import { Test, assert, TestSpreadsheetHelper } from "gas-lib/test";

export default () => {
  const masterSpreadsheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty(PropertyNames.mastersheetId)
  );
  const typeIdBase = 1;
  const suppliIdBase = 1000;
  const types = [createTypeValues(typeIdBase, "type1"), createTypeValues(typeIdBase + 1, "type2")];
  const supplis = [
    createSuppliValues(suppliIdBase, typeIdBase, 100, "suppli1", 10, "unit1"),
    createSuppliValues(suppliIdBase + 1, typeIdBase, 101, "suppli2", 11, "unit2")
  ];
  Test.run(
    "relation type",
    () => {
      const typeSheet = createTypeSheet(types);
      const suppliSheet = createSuppliSheet(supplis);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "type", typeSheet);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "suppli", suppliSheet);
    },
    () => {
      const repository = env.getMasterRepository();
      const actual = repository.getTypes();
      assert("1件目のtypeにsuppliが2件紐付いていること").toEqual(actual.length, 2);
      actual[0].supplis.forEach((s, idx) => {
        assert("suppliが存在すること").toMatchObject(s, supplis[idx]);
        assert("suppliからtypeが参照できること").toEqual(s.type.id, actual[0].id);
      });
      assert("2件目のtypeにsuppliが存在しないこと").toEqual(actual[1].supplis, []);
    }
  );
};
