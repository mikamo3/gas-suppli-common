import { Datastore } from "./Datastore";
import { IIntakeValues } from "model/index";
export declare class SpreadSheetDatastore implements Datastore {
    private sheetValues;
    private spreadSheet;
    constructor(configure: {
        spreadSheetId: string;
    });
    fetchMaker(): Pick<import("../model").Maker, "id" | "name">[];
    fetchIntake(): Pick<import("../model").Intake, "id" | "typeId" | "serving" | "timingId">[];
    fetchSuppli(): Pick<import("../model").Suppli, "id" | "name" | "makerId" | "typeId" | "amountPerServing" | "servingUnit">[];
    fetchSuppliAmount(): Pick<import("../model").SuppliAmount, "id" | "amount" | "suppliId">[];
    fetchTiming(): Pick<import("../model").Timing, "id" | "name">[];
    fetchType(): Pick<import("../model").Type, "id" | "name">[];
    private fetch;
    private getDataPosition;
    private convertModelValues;
    updateIntakes(intakes: IIntakeValues[]): void;
}
