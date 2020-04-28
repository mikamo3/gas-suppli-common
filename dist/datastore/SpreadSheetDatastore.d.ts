import { Datastore, DatastoreConfig } from "./Datastore";
import { IIntakeValues, IIntakeDetailValues } from "../model";
export declare type IRowValues = Array<string | number>;
export declare type IHeaderColums = Array<string>;
export declare type ISheetValues = Array<IRowValues>;
declare type SpreadSheetDatastoreConfig = {
    spreadSheetId: string;
} & DatastoreConfig;
export declare class SpreadSheetDatastore implements Datastore {
    private sheetValues;
    private spreadSheet;
    constructor(configure: SpreadSheetDatastoreConfig);
    fetchMaker(): Pick<import("../model").Maker, "id" | "name">[];
    fetchIntake(): Pick<import("../model").Intake, "id" | "typeId" | "serving" | "timingId">[];
    fetchSuppli(): Pick<import("../model").Suppli, "id" | "name" | "makerId" | "typeId" | "amountPerServing" | "servingUnit">[];
    fetchSuppliAmount(): Pick<import("../model").SuppliAmount, "id" | "amount" | "suppliId">[];
    fetchTiming(): Pick<import("../model").Timing, "id" | "name">[];
    fetchType(): Pick<import("../model").Type, "id" | "name">[];
    fetchForm(): Pick<import("../model").Form, "id" | "intakeId" | "formId">[];
    private fetch;
    private getDataPosition;
    private convertModelValues;
    updateIntakes(intakes: IIntakeValues[]): void;
    addIntakeDetails(intakeDetails: IIntakeDetailValues[]): void;
}
export {};
