import {
  Maker,
  IMakerValues,
  Suppli,
  ISuppliValues,
  SuppliAmount,
  ISuppliAmountValues,
  Intake,
  IIntakeValues,
  Timing,
  ITypeValues,
  ITimingValues,
  IFormValues,
  Type,
  Form,
  IntakeDetail,
  IIntakeDetailValues
} from "model/index";
import { ISheetValues, IRowValues } from "datastore/index";

export const createIntakeSheet = (intakes: Array<Intake | IIntakeValues>): ISheetValues => {
  return [
    ["id", "timingId", "typeId", "serving"],
    ...intakes.map<IRowValues>(intake => [
      intake.id,
      intake.timingId,
      intake.typeId,
      intake.serving
    ])
  ];
};

export const createMakerSheet = (makers: Array<Maker | IMakerValues>): ISheetValues => {
  return [["id", "name"], ...makers.map<IRowValues>(maker => [maker.id, maker.name])];
};

export const createSuppliSheet = (supplis: Array<Suppli | ISuppliValues>): ISheetValues => {
  return [
    ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
    ...supplis.map<IRowValues>(suppli => [
      suppli.id,
      suppli.typeId,
      suppli.makerId,
      suppli.name,
      suppli.amountPerServing,
      suppli.servingUnit
    ])
  ];
};

export const createSuppliAmountSheet = (
  suppliAmounts: Array<SuppliAmount | ISuppliAmountValues>
): ISheetValues => {
  return [
    ["id", "suppliId", "amount"],
    ...suppliAmounts.map<IRowValues>(suppliAmount => [
      suppliAmount.id,
      suppliAmount.suppliId,
      suppliAmount.amount
    ])
  ];
};

export const createTimingSheet = (timings: Array<Timing | ITimingValues>): ISheetValues => {
  return [["id", "name"], ...timings.map<IRowValues>(timing => [timing.id, timing.name])];
};

export const createTypeSheet = (types: Array<Type | ITypeValues>): ISheetValues => {
  return [["id", "name"], ...types.map<IRowValues>(type => [type.id, type.name])];
};

export const createFormSheet = (forms: Array<Form | IFormValues>) => {
  return [
    ["id", "intakeId", "formId"],
    ...forms.map<IRowValues>(form => [form.id, form.intakeId, form.formId])
  ];
};

export const createIntakeDetailSheet = (
  intakeDetails: Array<IntakeDetail | IIntakeDetailValues>
): ISheetValues => {
  return [
    ...intakeDetails.map(intakeDetail => [
      intakeDetail.date.toISOString(),
      intakeDetail.timingId,
      intakeDetail.suppliId,
      intakeDetail.serving
    ])
  ];
};
