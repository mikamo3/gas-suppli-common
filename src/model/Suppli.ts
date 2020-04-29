import { Type } from "./Type";
import { Maker } from "./Maker";
import { SuppliAmount } from "./SuppliAmount";
import { HasId, HasName } from "./common";

export type ISuppliValues = Omit<Suppli, "type" | "maker" | "suppliAmounts">;
export class Suppli implements HasId, HasName {
  id: number;
  makerId: number;
  typeId: number;
  amountPerServing: number;
  servingUnit: string;
  name: string;
  private getSuppliAmounts: () => SuppliAmount[];
  get type(): Type {
    return this.getType();
  }
  get maker(): Maker {
    return this.getMaker();
  }
  get suppliAmounts(): SuppliAmount[] {
    return this.getSuppliAmounts();
  }
  private getType: () => Type;
  private getMaker: () => Maker;
  constructor(
    suppliWithoutRelation: ISuppliValues,
    getType: () => Type,
    getMaker: () => Maker,
    getSuppliAmounts: () => SuppliAmount[]
  ) {
    this.id = suppliWithoutRelation.id;
    this.makerId = suppliWithoutRelation.makerId;
    this.typeId = suppliWithoutRelation.typeId;
    this.amountPerServing = suppliWithoutRelation.amountPerServing;
    this.servingUnit = suppliWithoutRelation.servingUnit;
    this.name = suppliWithoutRelation.name;
    this.getType = getType;
    this.getMaker = getMaker;
    this.getSuppliAmounts = getSuppliAmounts;
  }
}
