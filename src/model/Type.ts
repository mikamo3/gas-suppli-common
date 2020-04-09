import { Suppli } from "./Suppli";

export type ITypeValues = Omit<Type, "supplis">;
export class Type {
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
