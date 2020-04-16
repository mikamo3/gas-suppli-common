import { Datastore, DatastoreConfig } from "./Datastore";
import { IIntakeValues, IMakerValues, ISuppliValues, ISuppliAmountValues, ITimingValues, ITypeValues } from "model/index";
export declare class DummyDatastore implements Datastore {
    constructor(configure: DatastoreConfig);
    fetchIntake(): IIntakeValues[];
    fetchMaker(): IMakerValues[];
    fetchSuppli(): ISuppliValues[];
    fetchSuppliAmount(): ISuppliAmountValues[];
    fetchTiming(): ITimingValues[];
    fetchType(): ITypeValues[];
    updateIntakes(): void;
}
