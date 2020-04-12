import { Suppli } from "./Suppli";
import { ITypeValues } from "./Type";
export declare type IMakerValues = Omit<Maker, "supplis">;
export declare class Maker {
    id: number;
    name: string;
    private getSupplis;
    get supplis(): Suppli[];
    constructor(typeWithoutRelation: ITypeValues, getSupplis: () => Suppli[]);
}
