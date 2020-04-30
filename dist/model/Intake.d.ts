import { Timing } from "./Timing";
import { Type } from "./Type";
import { HasId } from "./types";
export declare type IIntakeValues = Omit<Intake, "timing" | "type">;
export declare class Intake implements HasId {
    id: number;
    serving: number;
    timingId: number;
    typeId: number;
    private getTiming;
    private getType;
    get type(): Type;
    get timing(): Timing;
    constructor(intake: IIntakeValues, getTiming: () => Timing, getType: () => Type);
}
