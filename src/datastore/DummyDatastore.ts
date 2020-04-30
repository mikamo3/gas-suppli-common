import { Datastore, DatastoreConfig } from "./Datastore";
import {
  IIntakeValues,
  IMakerValues,
  ISuppliValues,
  ISuppliAmountValues,
  ITimingValues,
  ITypeValues
} from "model/index";

export class DummyDatastore implements Datastore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(configure: DatastoreConfig) {
    //do nothing
  }
  fetchIntake(): IIntakeValues[] {
    return [];
  }
  fetchMaker(): IMakerValues[] {
    return [];
  }
  fetchSuppli(): ISuppliValues[] {
    return [];
  }
  fetchSuppliAmount(): ISuppliAmountValues[] {
    return [];
  }
  fetchTiming(): ITimingValues[] {
    return [];
  }
  fetchType(): ITypeValues[] {
    return [];
  }
  updateIntakes() {
    //do nothing
  }
  addIntakeDetails() {
    //do nothing
  }
}
