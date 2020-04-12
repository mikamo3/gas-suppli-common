import { Intake } from "./Intake";
export declare type ITimingValues = Omit<Timing, "intakes">;
export declare class Timing {
    id: number;
    name: string;
    get intakes(): Intake[];
    private getIntakes;
    constructor(timing: ITimingValues, getIntakes: () => Intake[]);
}
