import { Timing } from "./Timing";
import { Suppli } from "./Suppli";
export declare type IIntakeDetailValues = Omit<IntakeDetail, "timing" | "suppli">;
export declare class IntakeDetail {
    date: Date;
    timingId: number;
    suppliId: number;
    serving: number;
    private getTiming;
    private getSuppli;
    get timing(): Timing;
    get suppli(): Suppli;
    constructor(intakeDetail: IIntakeDetailValues, getTiming: () => Timing, getSuppli: () => Suppli);
}
