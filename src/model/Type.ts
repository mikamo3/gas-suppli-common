import { Suppli } from "./Suppli";
import { Intake } from "./Intake";
import { HasId, HasName } from "./types";

export type ITypeValues = Omit<Type, "supplis" | "intakes">;
export class Type implements HasId, HasName {
  id: number;
  name: string;
  private getSupplis: () => Suppli[];
  private getIntakes: () => Intake[];
  get supplis() {
    return this.getSupplis();
  }
  get intakes() {
    return this.getIntakes();
  }

  constructor(
    typeWithoutRelation: ITypeValues,
    getSupplis: () => Suppli[],
    getIntakes: () => Intake[]
  ) {
    this.id = typeWithoutRelation.id;
    this.name = typeWithoutRelation.name;
    this.getSupplis = getSupplis;
    this.getIntakes = getIntakes;
  }
}
