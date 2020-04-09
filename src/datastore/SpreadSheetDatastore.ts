import { Datastore } from "./Datastore";
import { IMakerValues } from "src/model/Maker";
import { filter } from "underscore";
import { IIntakeValues } from "src/model/Intake";
import { ISuppliValues } from "src/model/Suppli";
import { ISuppliAmountValues } from "src/model/SuppliAmount";
import { ITimingValues } from "src/model/Timing";
import { ITypeValues } from "src/model/Type";

type IColumPosition = { [s: string]: number };
type IRowValues = Array<string | number>;
type IHeaderColums = Array<string>;
type ISheetValues = Array<IRowValues>;
export class SpreadSheetDatastore implements Datastore {
  private spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  constructor(configure: { spreadSheetId: string }) {
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
    const sheetValues = this.spreadSheet
      .getSheetByName(sheetName)
      .getDataRange()
      .getValues() as ISheetValues;
    if (sheetValues.length === 0) {
      return [];
    }
    const dataPosition = this.getDataPosition(sheetValues);
    return this.convertModelValues<T>(dataPosition, sheetValues);
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
}
