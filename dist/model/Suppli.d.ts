import { Type } from "./Type";
import { Maker } from "./Maker";
import { SuppliAmount } from "./SuppliAmount";
import { HasId, HasName } from "./types";
export declare type ISuppliValues = Omit<Suppli, "type" | "maker" | "suppliAmounts">;
export declare class Suppli implements HasId, HasName {
    id: number;
    makerId: number;
    typeId: number;
    amountPerServing: number;
    servingUnit: string;
    name: string;
    private getSuppliAmounts;
    get type(): Type;
    get maker(): Maker;
    get suppliAmounts(): SuppliAmount[];
    private getType;
    private getMaker;
    constructor(suppliWithoutRelation: ISuppliValues, getType: () => Type, getMaker: () => Maker, getSuppliAmounts: () => SuppliAmount[]);
}
