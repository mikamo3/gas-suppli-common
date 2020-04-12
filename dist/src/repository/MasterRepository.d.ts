import { Datastore } from "datastore/Datastore";
import { Type, Suppli, Maker, SuppliAmount, Timing, Intake } from "model/index";
export declare class MasterRepository {
    datastore: Datastore;
    constructor(datastore: Datastore);
    getTypes(): Type[];
    getTypeById(id: number): Type;
    getSupplis(): Suppli[];
    getSuppliById(id: number): Suppli;
    getSupplisByTypeId(typeId: number): Suppli[];
    getSupplisByMakerId(makerId: number): Suppli[];
    getMakers(): Maker[];
    getMakerById(id: number): Maker;
    getSuppliAmounts(): SuppliAmount[];
    getSuppliAmountsBySuppliId(suppliId: number): SuppliAmount[];
    getTimings(): Timing[];
    getTimingById(id: number): Timing;
    getIntakes(): Intake[];
    getIntakesByTypeId(typeId: number): Intake[];
    getIntakesByTimingId(timingId: number): Intake[];
    updateIntakes(intakes: Intake[]): void;
    private createType;
    private createSuppli;
    private createMaker;
    private createSuppliAmounts;
    private createTiming;
    private createIntake;
}
