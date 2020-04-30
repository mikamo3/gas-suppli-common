import { Suppli } from "./Suppli";
import { ITypeValues } from "./Type";
import { HasId, HasName } from "./types";
export declare type IMakerValues = Omit<Maker, "supplis">;
export declare class Maker implements HasId, HasName {
    id: number;
    name: string;
    private getSupplis;
    get supplis(): Suppli[];
    constructor(typeWithoutRelation: ITypeValues, getSupplis: () => Suppli[]);
}
