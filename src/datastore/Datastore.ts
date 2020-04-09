import { ITypeValues } from "src/model/Type";
import { ISuppliValues } from "src/model/Suppli";
import { ISuppliAmountValues } from "src/model/SuppliAmount";
import { IMakerValues } from "src/model/Maker";
import { ITimingValues } from "src/model/Timing";
import { IIntakeValues } from "src/model/Intake";

export interface Datastore {
  fetchType: () => ITypeValues[];
  fetchSuppli: () => ISuppliValues[];
  fetchSuppliAmount: () => ISuppliAmountValues[];
  fetchMaker: () => IMakerValues[];
  fetchTiming: () => ITimingValues[];
  fetchIntake: () => IIntakeValues[];
}
