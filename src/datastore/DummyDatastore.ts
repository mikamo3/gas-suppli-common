import { Datastore, DatastoreConfig } from "./Datastore";

export class DummyDatastore implements Datastore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(configure: DatastoreConfig) {
    //do nothing
  }
  fetchIntake() {
    return [];
  }
  fetchMaker() {
    return [];
  }
  fetchSuppli() {
    return [];
  }
  fetchSuppliAmount() {
    return [];
  }
  fetchTiming() {
    return [];
  }
  fetchType() {
    return [];
  }
  updateIntakes() {
    return [];
  }
}
