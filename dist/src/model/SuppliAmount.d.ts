import { Suppli } from "./Suppli";
export declare type ISuppliAmountValues = Omit<SuppliAmount, "suppli">;
export declare class SuppliAmount {
    id: number;
    amount: number;
    suppliId: number;
    private getSuppli;
    constructor(suppliAmountWithoutRelation: ISuppliAmountValues, getSuppli: () => Suppli);
    get suppli(): Suppli;
}
