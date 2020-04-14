import {
  ITypeValues,
  MasterRepository,
  SpreadSheetDatastore,
  ITimingValues,
  IMakerValues,
  ISuppliValues,
  ISuppliAmountValues,
  IIntakeValues,
  createDatastore
} from "../../../src/index";
import { setTestdata } from "../spreadsheet";
import { assert, testMasterRepository } from "./common";
export default (spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet) => {
  testMasterRepository(
    "masterData",
    spreadSheet,
    spreadsheet => {
      const typeValues = [
        ["id", "name"],
        [1, "type1"],
        [2, "type2"]
      ];
      const timingValues = [
        ["id", "name"],
        [10, "timing1"],
        [20, "timing2"],
        [30, "timing3"]
      ];
      const makerValues = [
        ["id", "name"],
        [100, "maker1"],
        [200, "maker2"],
        [300, "maker3"]
      ];
      const suppliValues = [
        ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
        [1000, 1, 100, "suppli1", 5, "unit1"],
        [2000, 2, 101, "suppli2", 6, "unit2"]
      ];
      const suppliAmountValues = [
        ["id", "suppliId", "amount"],
        [1, 10, 5],
        [2, 11, 6]
      ];
      const intakeValues = [
        ["id", "timingId", "typeId", "serving"],
        [1, 10, 100, 0.1],
        [2, 11, 101, 0.2]
      ];

      setTestdata(spreadsheet, "type", typeValues);
      setTestdata(spreadsheet, "timing", timingValues);
      setTestdata(spreadsheet, "maker", makerValues);
      setTestdata(spreadsheet, "suppli", suppliValues);
      setTestdata(spreadsheet, "suppliAmount", suppliAmountValues);
      setTestdata(spreadsheet, "intake", intakeValues);
    },
    () => {
      const assertReturnValue = (actual: Array<object>, expected: Array<object>) => {
        actual.forEach((a, idx) =>
          assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx])
        );
        assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
      };
      const testSpreadSheetId = PropertiesService.getScriptProperties().getProperty(
        "testSpreadSheetId"
      );
      const dataStore = createDatastore(SpreadSheetDatastore, { spreadSheetId: testSpreadSheetId });
      const repository = new MasterRepository(dataStore);
      const expectedType: ITypeValues[] = [
        { id: 1, name: "type1" },
        { id: 2, name: "type2" }
      ];
      assertReturnValue(repository.getTypes(), expectedType);
      const expectedTiming: ITimingValues[] = [
        { id: 10, name: "timing1" },
        { id: 20, name: "timing2" },
        { id: 30, name: "timing3" }
      ];
      assertReturnValue(repository.getTimings(), expectedTiming);
      const expectedMaker: IMakerValues[] = [
        { id: 100, name: "maker1" },
        { id: 200, name: "maker2" },
        { id: 300, name: "maker3" }
      ];
      assertReturnValue(repository.getMakers(), expectedMaker);
      const expectedSuppliValues: ISuppliValues[] = [
        {
          id: 1000,
          typeId: 1,
          makerId: 100,
          name: "suppli1",
          amountPerServing: 5,
          servingUnit: "unit1"
        },
        {
          id: 2000,
          typeId: 2,
          makerId: 101,
          name: "suppli2",
          amountPerServing: 6,
          servingUnit: "unit2"
        }
      ];
      assertReturnValue(repository.getSupplis(), expectedSuppliValues);
      const expectedSuppliAmountValues: ISuppliAmountValues[] = [
        { id: 1, suppliId: 10, amount: 5 },
        { id: 2, suppliId: 11, amount: 6 }
      ];
      assertReturnValue(repository.getSuppliAmounts(), expectedSuppliAmountValues);
      const expectedIntakeValues: IIntakeValues[] = [
        { id: 1, timingId: 10, typeId: 100, serving: 0.1 },
        { id: 2, timingId: 11, typeId: 101, serving: 0.2 }
      ];
      assertReturnValue(repository.getIntakes(), expectedIntakeValues);
    }
  );
};
