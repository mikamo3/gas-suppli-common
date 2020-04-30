import { Datastore } from "../datastore/Datastore";
import { IIntakeValues, Intake, Maker, Suppli, SuppliAmount, Timing, Type, IntakeDetail, IIntakeDetailValues } from "../model/index";
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
    getMakerByName(name: string): Maker;
    getSuppliAmounts(): SuppliAmount[];
    getSuppliAmountsBySuppliId(suppliId: number): SuppliAmount[];
    getTimings(): Timing[];
    getTimingById(id: number): Timing;
    getTimingByName(name: string): Timing;
    getIntakes(): Intake[];
    getIntakeById(id: number): Intake;
    getIntakesByTypeId(typeId: number): Intake[];
    getIntakesByTimingId(timingId: number): Intake[];
    updateIntakes(intakes: Array<Intake | IIntakeValues>): void;
    addIntakeDetails(intakeDetails: Array<IntakeDetail | IIntakeDetailValues>): void;
    private getFirstBy;
    private getBy;
}
