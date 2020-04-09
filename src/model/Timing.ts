import { Intake } from "./Intake";

export type ITimingValues = Omit<Timing, "intakes">;
export class Timing {
  id: number;
  name: string;
  get intakes() {
    return this.getIntakes();
  }
  private getIntakes: () => Intake[];
  constructor(timing: ITimingValues, getIntakes: () => Intake[]) {
    this.id = timing.id;
    this.name = timing.name;
    this.getIntakes = getIntakes;
  }
}
