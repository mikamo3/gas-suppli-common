import { Timing } from "./Timing";
import { Type } from "./Type";
import { HasId } from "./types";

export type IIntakeValues = Omit<Intake, "timing" | "type">;
export class Intake implements HasId {
  id: number;
  serving: number;
  timingId: number;
  typeId: number;
  private getTiming: () => Timing;
  private getType: () => Type;

  get type() {
    return this.getType();
  }

  get timing() {
    return this.getTiming();
  }
  constructor(intake: IIntakeValues, getTiming: () => Timing, getType: () => Type) {
    this.id = intake.id;
    this.serving = intake.serving;
    this.timingId = intake.timingId;
    this.typeId = intake.typeId;
    this.getTiming = getTiming;
    this.getType = getType;
  }
}
