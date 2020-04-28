import {
  createIntakeDetailValues,
  PropertyNames,
  createIntakeDetailSheet,
  env
} from "../../../src/index";
import { Test, TestSpreadsheetHelper, assert, Spreadsheet } from "gas-lib";

export default () => {
  const spreadSheet = Spreadsheet.openById(
    PropertiesService.getScriptProperties().getProperty(PropertyNames.mastersheetId)
  );
  const masterSpreadsheet = spreadSheet.getSpreadsheet();

  const baseDate = new Date("2020-04-01T12:00:00.000Z");
  const intakeDetailsBefore = [createIntakeDetailValues(baseDate, 10, 100, 1000)];
  Test.run(
    "addIntakeDetails",
    () => {
      const intakeDetailSheet = createIntakeDetailSheet(intakeDetailsBefore);

      TestSpreadsheetHelper.setTestdata(masterSpreadsheet, "intakeDetail", intakeDetailSheet);
    },
    () => {
      const assertReturnValue = (actual: Array<object>, expected: Array<object>) => {
        actual.forEach((a, idx) =>
          assert("取得結果が期待値どおりであること").toMatchObject(a, expected[idx])
        );
        assert("取得件数が期待値どおりであること").toEqual(actual.length, expected.length);
      };
      const repository = env.getMasterRepository();
      const addIntakeDetailValues = [
        createIntakeDetailValues(baseDate, 10, 20, 30),
        createIntakeDetailValues(baseDate, 11, 21, 31)
      ];
      repository.addIntakeDetails(addIntakeDetailValues);
      const expected = [
        ["2020-04-01T12:00:00.000Z", 10, 100, 1000],
        ["2020-04-01T12:00:00.000Z", 10, 20, 30],
        ["2020-04-01T12:00:00.000Z", 11, 21, 31]
      ];
      assertReturnValue(spreadSheet.getAllValues("intakeDetail"), expected);
    }
  );
};
