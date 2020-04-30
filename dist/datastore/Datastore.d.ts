import { ITypeValues, ISuppliValues, ISuppliAmountValues, IMakerValues, ITimingValues, IIntakeValues, IIntakeDetailValues } from "../model/index";
export interface Datastore {
    fetchType: () => ITypeValues[];
    fetchSuppli: () => ISuppliValues[];
    fetchSuppliAmount: () => ISuppliAmountValues[];
    fetchMaker: () => IMakerValues[];
    fetchTiming: () => ITimingValues[];
    fetchIntake: () => IIntakeValues[];
    updateIntakes: (intakes: IIntakeValues[]) => void;
    addIntakeDetails: (intakeDetails: IIntakeDetailValues[]) => void;
}
export interface DatastoreConstructor {
    new (configure: DatastoreConfig): Datastore;
}
export declare type DatastoreConfig = {};
export declare const createDatastore: (datastore: DatastoreConstructor, configure: DatastoreConfig) => Datastore;
