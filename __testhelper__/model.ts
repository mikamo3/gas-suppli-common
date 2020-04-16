import {
  ITypeValues,
  ISuppliValues,
  ISuppliAmountValues,
  IMakerValues,
  ITimingValues,
  IIntakeValues
} from "model/index";

export const createType = (id = 1, name = "type"): ITypeValues => ({
  id,
  name
});
export const createSuppli = (
  id = 1,
  typeId = 10,
  makerId = 100,
  name = "suppli",
  amountPerServing = 999,
  servingUnit = "unit"
): ISuppliValues => ({ id, typeId, makerId, name, amountPerServing, servingUnit });
export const createSuppliAmount = (id = 0, suppliId = 10, amount = 100): ISuppliAmountValues => ({
  id,
  suppliId,
  amount
});
export const createMaker = (id = 1, name = "type"): IMakerValues => ({
  id,
  name
});
export const createTiming = (id = 1, name = "timing"): ITimingValues => ({ id, name });
export const createIntake = (id = 1, timingId = 10, typeId = 100, serving = 5): IIntakeValues => ({
  id,
  timingId,
  typeId,
  serving
});
