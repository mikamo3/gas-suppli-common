import {
  env,
  PropertyNames,
  createTypeSheet,
  createTypeValues,
  createTimingSheet,
  createTimingValues,
  createMakerValues,
  createMakerSheet,
  createSuppliValues,
  createSuppliSheet,
  createSuppliAmountValues,
  createSuppliAmountSheet,
  createIntakeValues,
  createIntakeSheet,
  createFormSheet,
  createFormValues
} from "../../../src/index";
import { Test, TestSpreadsheetHelper, assert } from "gas-lib/test";
export default () => {
  const masterSpreadsheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty(PropertyNames.mastersheetId)
  );
  const types = [createTypeValues(1, "type1"), createTypeValues(2, "type2")];
  const timings = [
    createTimingValues(1, "timing1"),
    createTimingValues(2, "timing2"),
    createTimingValues(3, "timing3")
  ];
  const makers = [
    createMakerValues(100, "maker1"),
    createMakerValues(200, "maker2"),
    createMakerValues(300, "maker3")
  ];
  const supplis = [
    createSuppliValues(1000, 1, 100, "suppli1", 5, "unit1"),
    createSuppliValues(2000, 2, 101, "suppli2", 6, "unit2")
  ];
  const suppliAmounts = [createSuppliAmountValues(1, 10, 5), createSuppliAmountValues(2, 11, 6)];
  const intakes = [createIntakeValues(1, 10, 100, 0.1), createIntakeValues(2, 11, 101, 0.2)];
  const forms = [
    createFormValues(1, 10, "formId1"),
    createFormValues(2, 11, "formId2"),
    createFormValues(3, 12, "formId3")
  ];
  Test.run(
    "masterData",
    () => {
      const typeValues = createTypeSheet(types);
      const timingValues = createTimingSheet(timings);
      const makerValues = createMakerSheet(makers);
      const suppliValues = createSuppliSheet(supplis);
      const suppliAmountValues = createSuppliAmountSheet(suppliAmounts);
      const intakeValues = createIntakeSheet(intakes);
      const formValues = createFormSheet(forms);

      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "type", typeValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "timing", timingValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "maker", makerValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "suppli", suppliValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "suppliAmount", suppliAmountValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "intake", intakeValues);
      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "form", formValues);
    },
    () => {
      const assertReturnValue = (actual: Array<object>, expected: Array<object>) => {
        actual.forEach((a, idx) =>
          assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx])
        );
        assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
      };

      const repository = env.getMasterRepository();
      assertReturnValue(repository.getTypes(), types);
      assertReturnValue(repository.getTimings(), timings);
      assertReturnValue(repository.getMakers(), makers);
      assertReturnValue(repository.getSupplis(), supplis);
      assertReturnValue(repository.getSuppliAmounts(), suppliAmounts);
      assertReturnValue(repository.getIntakes(), intakes);
      assertReturnValue(repository.getForms(), forms);
    }
  );
};
