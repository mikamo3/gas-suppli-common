import { Suppli } from "./Suppli";
import { HasId } from "./types";
export declare type ISuppliAmountValues = Omit<SuppliAmount, "suppli">;
export declare class SuppliAmount implements HasId {
    id: number;
    amount: number;
    suppliId: number;
    private getSuppli;
    constructor(suppliAmountWithoutRelation: ISuppliAmountValues, getSuppli: () => Suppli);
    get suppli(): Suppli;
}
