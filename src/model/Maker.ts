import { Suppli } from "./Suppli";
import { ITypeValues } from "./Type";

export type IMakerValues = Omit<Maker, "supplis">;
export class Maker {
  id: number;
  name: string;
  private getSupplis: () => Suppli[];
  get supplis() {
    return this.getSupplis();
  }

  constructor(typeWithoutRelation: ITypeValues, getSupplis: () => Suppli[]) {
    this.id = typeWithoutRelation.id;
    this.name = typeWithoutRelation.name;
    this.getSupplis = getSupplis;
  }
}
