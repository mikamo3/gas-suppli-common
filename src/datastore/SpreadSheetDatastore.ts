import { filter } from "underscore";
import { Datastore, DatastoreConfig } from "./Datastore";
import {
  IMakerValues,
  IIntakeValues,
  ISuppliValues,
  ISuppliAmountValues,
  ITimingValues,
  ITypeValues,
  IIntakeDetailValues
} from "../model";
import { Spreadsheet } from "gas-lib";
type IColumPosition = { [s: string]: number };
export type IRowValues = Array<string | number>;
export type IHeaderColums = Array<string>;
export type ISheetValues = Array<IRowValues>;
const intakeColumnPosition: { [s in keyof IIntakeValues]: number } = {
  id: 0,
  timingId: 1,
  typeId: 2,
  serving: 3
};
const intakeDatailColumPosition: { [s in keyof IIntakeDetailValues]: number } = {
  date: 0,
  timingId: 1,
  suppliId: 2,
  serving: 3
};
type SpreadSheetDatastoreConfig = {
  spreadSheetId: string;
} & DatastoreConfig;

export class SpreadSheetDatastore implements Datastore {
  private sheetValues: { [s: string]: ISheetValues };
  private spreadSheet: Spreadsheet;
  constructor(configure: SpreadSheetDatastoreConfig) {
    this.sheetValues = {};
    if (!configure.spreadSheetId) {
      throw Error("configure.spreadSheetId does not found");
    }
    this.spreadSheet = Spreadsheet.openById(configure.spreadSheetId);
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
      const sheetValues = this.spreadSheet.getAllValues(sheetName) as ISheetValues;
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
    const intakeArray = intakes.map<IRowValues>(i => {
      const intakeRow = [];
      for (const position in intakeColumnPosition) {
        intakeRow[intakeColumnPosition[position]] = i[position];
      }
      return intakeRow;
    });
    this.spreadSheet.replace("intake", intakeArray, 1);
  }
  addIntakeDetails(intakeDetails: IIntakeDetailValues[]) {
    const intakeDetailArray = intakeDetails.map<IRowValues>(id => {
      const row = [];
      for (const position in intakeDatailColumPosition) {
        row[intakeDatailColumPosition[position]] = id[position];
      }
      row[0] = id.date.toISOString();
      return row;
    });
    this.spreadSheet.add("intakeDetail", intakeDetailArray);
  }
}
