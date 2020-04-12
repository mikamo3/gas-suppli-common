import { Suppli } from "./Suppli";
import { Intake } from "./Intake";
export declare type ITypeValues = Omit<Type, "supplis" | "intakes">;
export declare class Type {
    id: number;
    name: string;
    private getSupplis;
    private getIntakes;
    get supplis(): Suppli[];
    get intakes(): Intake[];
    constructor(typeWithoutRelation: ITypeValues, getSupplis: () => Suppli[], getIntakes: () => Intake[]);
}
