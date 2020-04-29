import { Suppli } from "./Suppli";
import { HasId } from "./common";

export type ISuppliAmountValues = Omit<SuppliAmount, "suppli">;
export class SuppliAmount implements HasId {
  id: number;
  amount: number;
  suppliId: number;
  private getSuppli: () => Suppli;
  constructor(suppliAmountWithoutRelation: ISuppliAmountValues, getSuppli: () => Suppli) {
    this.id = suppliAmountWithoutRelation.id;
    this.amount = suppliAmountWithoutRelation.amount;
    this.suppliId = suppliAmountWithoutRelation.suppliId;
    this.getSuppli = getSuppli;
  }
  get suppli() {
    return this.getSuppli();
  }
}
