import { env, PropertyNames, createIntakeValues, createIntakeSheet } from "../../../src/index";
import { Test, TestSpreadsheetHelper, assert } from "gas-lib/test";

export default () => {
  const masterSpreadsheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty(PropertyNames.mastersheetId)
  );
  const intakesBefore = [createIntakeValues(1, 10, 100, 0.1), createIntakeValues(2, 11, 101, 0.2)];
  Test.run(
    "updateIntakes",
    () => {
      const intakeSheet = createIntakeSheet(intakesBefore);

      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "intake", intakeSheet);
    },
    () => {
      const assertReturnValue = (actual: Array<object>, expected: Array<object>) => {
        actual.forEach((a, idx) =>
          assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx])
        );
        assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
      };
      const repository = env.getMasterRepository();
      assertReturnValue(repository.getIntakes(), intakesBefore);
      const updateIntakeValues = [
        createIntakeValues(10, 100, 1000, 10.0),
        createIntakeValues(11, 101, 1001, 10.1),
        createIntakeValues(12, 102, 1002, 10.2),
        createIntakeValues(13, 103, 1003, 10.3),
        createIntakeValues(14, 104, 1004, 10.4)
      ];
      repository.updateIntakes(updateIntakeValues);
      const expectedIntakeValuesAfterUpdate = updateIntakeValues;
      assertReturnValue(repository.getIntakes(), expectedIntakeValuesAfterUpdate);
    }
  );
};
