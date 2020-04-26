import {
  IIntakeValues,
  IMakerValues,
  ISuppliAmountValues,
  ISuppliValues,
  ITimingValues,
  ITypeValues,
  Type,
  Suppli,
  Intake,
  Maker,
  SuppliAmount,
  Timing,
  IFormValues,
  Form
} from "model/index";

export const createIntakeValues = (
  id = 1,
  timingId = 10,
  typeId = 100,
  serving = 5
): IIntakeValues => ({
  id,
  timingId,
  typeId,
  serving
});

export const createIntake = (
  id = 1,
  timingId = 10,
  typeId = 100,
  serving = 5,
  getTiming = () => undefined,
  getServing = () => undefined
) => new Intake(createIntakeValues(id, timingId, typeId, serving), getTiming, getServing);

export const createMakerValues = (id = 1, name = "type"): IMakerValues => ({
  id,
  name
});

export const createMaker = (id = 1, name = "type", getSupplis: () => Suppli[] = () => []) =>
  new Maker(createMakerValues(id, name), getSupplis);

export const createSuppliValues = (
  id = 1,
  typeId = 10,
  makerId = 100,
  name = "suppli",
  amountPerServing = 999,
  servingUnit = "unit"
): ISuppliValues => ({ id, typeId, makerId, name, amountPerServing, servingUnit });
export const createSuppli = (
  id = 1,
  typeId = 10,
  makerId = 100,
  name = "suppli",
  amountPerServing = 999,
  servingUnit = "unit",
  getType: () => Type = () => undefined,
  getMaker: () => Maker = () => undefined,
  getSuppliAmounts: () => SuppliAmount[] = () => []
) =>
  new Suppli(
    createSuppliValues(id, typeId, makerId, name, amountPerServing, servingUnit),
    getType,
    getMaker,
    getSuppliAmounts
  );

export const createSuppliAmountValues = (
  id = 0,
  suppliId = 10,
  amount = 100
): ISuppliAmountValues => ({
  id,
  suppliId,
  amount
});

export const createSuppliAmount = (
  id = 0,
  suppliId = 10,
  amount = 100,
  getSuppli: () => Suppli = () => undefined
) => new SuppliAmount(createSuppliAmountValues(id, suppliId, amount), getSuppli);

export const createTimingValues = (id = 1, name = "timing"): ITimingValues => ({ id, name });
export const createTiming = (id = 1, name = "timing", getIntakes: () => Intake[] = () => []) =>
  new Timing(createTimingValues(id, name), getIntakes);

export const createTypeValues = (id = 1, name = "type"): ITypeValues => ({
  id,
  name
});
export const createType = (
  id = 1,
  name = "type",
  getSupplis: () => Suppli[] = () => [],
  getIntakes: () => Intake[] = () => []
): Type => new Type(createTypeValues(id, name), getSupplis, getIntakes);

export const createFormValues = (id = 1, intakeId = 10, formId = "id"): IFormValues => ({
  id,
  intakeId,
  formId
});
export const createForm = (id = 1, intakeId = 10, formId = "id") =>
  new Form(createFormValues(id, intakeId, formId), () => undefined);
