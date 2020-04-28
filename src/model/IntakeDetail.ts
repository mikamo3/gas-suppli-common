import { Timing } from "./Timing";
import { Suppli } from "./Suppli";

export type IIntakeDetailValues = Omit<IntakeDetail, "timing" | "suppli">;
export class IntakeDetail {
  date: Date;
  timingId: number;
  suppliId: number;
  serving: number;
  private getTiming: () => Timing;
  private getSuppli: () => Suppli;

  get timing() {
    return this.getTiming();
  }
  get suppli() {
    return this.getSuppli();
  }
  constructor(intakeDetail: IIntakeDetailValues, getTiming: () => Timing, getSuppli: () => Suppli) {
    this.date = intakeDetail.date;
    this.timingId = intakeDetail.timingId;
    this.suppliId = intakeDetail.suppliId;
    this.serving = intakeDetail.serving;
    this.getTiming = getTiming;
    this.getSuppli = getSuppli;
  }
}
