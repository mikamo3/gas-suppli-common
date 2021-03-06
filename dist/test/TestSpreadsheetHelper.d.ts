import { Maker, Suppli, SuppliAmount, Intake, Timing, Type, IntakeDetail } from "../model/index";
import { ISheetValues } from "../datastore/index";
export declare const createIntakeSheet: (intakes: (Intake | Pick<Intake, "id" | "typeId" | "serving" | "timingId">)[]) => ISheetValues;
export declare const createMakerSheet: (makers: (Maker | Pick<Maker, "id" | "name">)[]) => ISheetValues;
export declare const createSuppliSheet: (supplis: (Suppli | Pick<Suppli, "id" | "name" | "makerId" | "typeId" | "amountPerServing" | "servingUnit">)[]) => ISheetValues;
export declare const createSuppliAmountSheet: (suppliAmounts: (SuppliAmount | Pick<SuppliAmount, "id" | "amount" | "suppliId">)[]) => ISheetValues;
export declare const createTimingSheet: (timings: (Timing | Pick<Timing, "id" | "name">)[]) => ISheetValues;
export declare const createTypeSheet: (types: (Type | Pick<Type, "id" | "name">)[]) => ISheetValues;
export declare const createIntakeDetailSheet: (intakeDetails: (IntakeDetail | Pick<IntakeDetail, "suppliId" | "serving" | "timingId" | "date">)[]) => ISheetValues;
