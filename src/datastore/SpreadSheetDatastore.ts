import { filter } from "underscore";
import { Datastore } from "./Datastore";
import {
  IMakerValues,
  IIntakeValues,
  ISuppliValues,
  ISuppliAmountValues,
  ITimingValues,
  ITypeValues
} from "model/index";

type IColumPosition = { [s: string]: number };
type IRowValues = Array<string | number>;
type IHeaderColums = Array<string>;
type ISheetValues = Array<IRowValues>;
const intakeColumnPosition: { [s in keyof IIntakeValues]: number } = {
  id: 0,
  timingId: 1,
  typeId: 2,
  serving: 3
};

export class SpreadSheetDatastore implements Datastore {
  private sheetValues: { [s: string]: ISheetValues };
  private spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  constructor(configure: { spreadSheetId: string }) {
    this.sheetValues = {};
    this.spreadSheet = SpreadsheetApp.openById(configure.spreadSheetId);
  }
  fetchMaker() {
    return this.fetch<IMakerValues>("maker");
  }
  fetchIntake() {
    return this.fetch<IIntakeValues>("intake");
  }
  fetchSuppli() {
    return this.fetch<ISuppliValues>("suppli");
  }
  fetchSuppliAmount() {
    return this.fetch<ISuppliAmountValues>("suppliAmount");
  }
  fetchTiming() {
    return this.fetch<ITimingValues>("timing");
  }
  fetchType() {
    return this.fetch<ITypeValues>("type");
  }
  private fetch<T>(sheetName: string) {
    if (!(sheetName in this.sheetValues)) {
      const sheetValues = this.spreadSheet
        .getSheetByName(sheetName)
        .getDataRange()
        .getValues() as ISheetValues;
      this.sheetValues[sheetName] = sheetValues;
    }
    if (this.sheetValues[sheetName].length === 0) {
      return [];
    }
    const dataPosition = this.getDataPosition(this.sheetValues[sheetName]);
    return this.convertModelValues<T>(dataPosition, this.sheetValues[sheetName]);
  }
  private getDataPosition(sheetValues: ISheetValues): IColumPosition {
    const header = sheetValues[0] as IHeaderColums;
    return header.reduce<IColumPosition>((prev, cur, idx) => {
      prev[cur] = idx;
      return prev;
    }, {});
  }
  private convertModelValues<T>(dataPosition: IColumPosition, sheetValues: ISheetValues): T[] {
    const values = filter(sheetValues, (_, idx) => idx !== 0);
    return values.map<T>(value => {
      const obj = {} as T;
      for (const k in dataPosition) {
        obj[k] = value[dataPosition[k]];
      }
      return obj;
    }, []);
  }
  updateIntakes(intakes: IIntakeValues[]) {
    delete this.sheetValues["intake"];
    const sheet = this.spreadSheet.getSheetByName("intake");
    const lastRow = sheet.getLastRow();
    sheet.deleteRows(2, lastRow - 1);
    if (intakes.length !== 0) {
      const intakeArray = intakes.map<IRowValues>(i => {
        const intakeRow = [];
        for (const position in intakeColumnPosition) {
          intakeRow[intakeColumnPosition[position]] = i[position];
        }
        return intakeRow;
      });
      sheet.insertRowsAfter(1, intakes.length);
      const range = sheet.getRange(2, 1, intakeArray.length, intakeArray[0].length);
      range.setValues(intakeArray);
    }
  }
}
