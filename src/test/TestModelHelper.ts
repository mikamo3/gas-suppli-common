import {
  IIntakeValues,
  IMakerValues,
  ISuppliAmountValues,
  ISuppliValues,
  ITimingValues,
  ITypeValues
} from "model/index";

export const createTypeValues = (id = 1, name = "type"): ITypeValues => ({
  id,
  name
});
export const createSuppliValues = (
  id = 1,
  typeId = 10,
  makerId = 100,
  name = "suppli",
  amountPerServing = 999,
  servingUnit = "unit"
): ISuppliValues => ({ id, typeId, makerId, name, amountPerServing, servingUnit });
export const createSuppliAmountValues = (
  id = 0,
  suppliId = 10,
  amount = 100
): ISuppliAmountValues => ({
  id,
  suppliId,
  amount
});
export const createMakerValues = (id = 1, name = "type"): IMakerValues => ({
  id,
  name
});
export const createTimingValues = (id = 1, name = "timing"): ITimingValues => ({ id, name });
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
