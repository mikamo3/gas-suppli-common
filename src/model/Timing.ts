import { Intake } from "./Intake";
import { HasId, HasName } from "./types";

export type ITimingValues = Omit<Timing, "intakes">;
export class Timing implements HasId, HasName {
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
