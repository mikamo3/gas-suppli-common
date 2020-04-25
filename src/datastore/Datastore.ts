import {
  ITypeValues,
  ISuppliValues,
  ISuppliAmountValues,
  IMakerValues,
  ITimingValues,
  IIntakeValues,
  IFormValues
} from "../model/index";

export interface Datastore {
  fetchType: () => ITypeValues[];
  fetchSuppli: () => ISuppliValues[];
  fetchSuppliAmount: () => ISuppliAmountValues[];
  fetchMaker: () => IMakerValues[];
  fetchTiming: () => ITimingValues[];
  fetchIntake: () => IIntakeValues[];
  fetchForm: () => IFormValues[];
  updateIntakes: (intakes: IIntakeValues[]) => void;
}

export interface DatastoreConstructor {
  new (configure: DatastoreConfig): Datastore;
}
export type DatastoreConfig = {};
export const createDatastore = (datastore: DatastoreConstructor, configure: DatastoreConfig) =>
  new datastore(configure);
