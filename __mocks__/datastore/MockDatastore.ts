import { Datastore } from "src/datastore/Datastore";
import { ISuppliValues } from "src/model/Suppli";
import { ITypeValues } from "src/model/Type";
import { IMakerValues } from "src/model/Maker";
import { ISuppliAmountValues } from "src/model/SuppliAmount";
import { ITimingValues } from "src/model/Timing";
import { IIntakeValues } from "src/model/Intake";

export const fetchSuppli = jest.fn<ISuppliValues[], []>();
export const fetchType = jest.fn<ITypeValues[], []>();
export const fetchMaker = jest.fn<IMakerValues[], []>();
export const fetchSuppliAmount = jest.fn<ISuppliAmountValues[], []>();
export const fetchTiming = jest.fn<ITimingValues[], []>();
export const fetchIntake = jest.fn<IIntakeValues[], []>();

let fetchSuppliReturnValue: ISuppliValues[] = [];
let fetchTypeReturnValue: ITypeValues[] = [];
let fetchMakerReturnValue: IMakerValues[] = [];
let fetchSuppliAmountReturnValue: ISuppliAmountValues[] = [];
let fetchTimingReturnValue: ITimingValues[] = [];
let fetchIntakeReturnValue: IIntakeValues[] = [];

const mockedDatastore = jest.fn<Datastore, []>().mockImplementation(() => ({
  fetchSuppli,
  fetchType,
  fetchMaker,
  fetchSuppliAmount,
  fetchTiming,
  fetchIntake
}));

export const setFetchSuppliReturnValue = (value: ISuppliValues[]) => {
  fetchSuppliReturnValue = value;
};
export const setFetchTypeReturnValue = (value: ITypeValues[]) => {
  fetchTypeReturnValue = value;
};
export const setFetchMakerReturnValue = (value: IMakerValues[]) => {
  fetchMakerReturnValue = value;
};
export const setFetchSuppliAmountReturnValue = (value: ISuppliAmountValues[]) => {
  fetchSuppliAmountReturnValue = value;
};
export const setFetchTimingReturnValue = (value: ITimingValues[]) => {
  fetchTimingReturnValue = value;
};
export const setFetchIntakeReturnValue = (value: IIntakeValues[]) => {
  fetchIntakeReturnValue = value;
};

export default mockedDatastore;
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
export const init = () => {
  fetchSuppliReturnValue = [];
  fetchTypeReturnValue = [];
  fetchMakerReturnValue = [];
  fetchSuppliAmountReturnValue = [];
  fetchTimingReturnValue = [];
  fetchIntakeReturnValue = [];

  beforeEach(() => {
    fetchSuppli.mockReturnValue(fetchSuppliReturnValue);
    fetchType.mockReturnValue(fetchTypeReturnValue);
    fetchMaker.mockReturnValue(fetchMakerReturnValue);
    fetchSuppliAmount.mockReturnValue(fetchSuppliAmountReturnValue);
    fetchTiming.mockReturnValue(fetchTimingReturnValue);
    fetchIntake.mockReturnValue(fetchIntakeReturnValue);
  });
};
