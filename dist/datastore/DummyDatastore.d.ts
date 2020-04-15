import { Datastore, DatastoreConfig } from "./Datastore";
export declare class DummyDatastore implements Datastore {
    constructor(configure: DatastoreConfig);
    fetchIntake(): any[];
    fetchMaker(): any[];
    fetchSuppli(): any[];
    fetchSuppliAmount(): any[];
    fetchTiming(): any[];
    fetchType(): any[];
    updateIntakes(): any[];
}
