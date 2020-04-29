import { Suppli } from "./Suppli";
import { Intake } from "./Intake";
import { HasId, HasName } from "./common";
export declare type ITypeValues = Omit<Type, "supplis" | "intakes">;
export declare class Type implements HasId, HasName {
    id: number;
    name: string;
    private getSupplis;
    private getIntakes;
    get supplis(): Suppli[];
    get intakes(): Intake[];
    constructor(typeWithoutRelation: ITypeValues, getSupplis: () => Suppli[], getIntakes: () => Intake[]);
}
