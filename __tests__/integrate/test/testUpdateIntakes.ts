import { IIntakeValues, env, PropertyNames } from "../../../src/index";
import { Test, TestSpreadsheetHelper, assert } from "gas-lib/test";

export default () => {
  const masterSpreadsheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty(PropertyNames.mastersheetId)
  );
  Test.run(
    "updateIntakes",
    () => {
      const intakeValues = [
        ["id", "timingId", "typeId", "serving"],
        [1, 10, 100, 0.1],
        [2, 11, 101, 0.2]
      ];

      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "intake", intakeValues);
    },
    () => {
      const assertReturnValue = (actual: Array<object>, expected: Array<object>) => {
        actual.forEach((a, idx) =>
          assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx])
        );
        assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
      };
      const repository = env.getMasterRepository();
      const expectedIntakeValues: IIntakeValues[] = [
        { id: 1, timingId: 10, typeId: 100, serving: 0.1 },
        { id: 2, timingId: 11, typeId: 101, serving: 0.2 }
      ];
      assertReturnValue(repository.getIntakes(), expectedIntakeValues);
      const updateIntakeValues: IIntakeValues[] = [
        { id: 1, timingId: 10, typeId: 100, serving: 0.1 },
        { id: 2, timingId: 11, typeId: 101, serving: 0.2 },
        { id: 3, timingId: 12, typeId: 102, serving: 0.3 },
        { id: 4, timingId: 13, typeId: 103, serving: 0.4 }
      ];
      repository.updateIntakes(updateIntakeValues);
      const expectedIntakeValuesAfterUpdate = updateIntakeValues;
      assertReturnValue(repository.getIntakes(), expectedIntakeValuesAfterUpdate);
    }
  );
};
