import { Intake } from "./Intake";
import { HasId, HasName } from "./types";
export declare type ITimingValues = Omit<Timing, "intakes">;
export declare class Timing implements HasId, HasName {
    id: number;
    name: string;
    get intakes(): Intake[];
    private getIntakes;
    constructor(timing: ITimingValues, getIntakes: () => Intake[]);
}
