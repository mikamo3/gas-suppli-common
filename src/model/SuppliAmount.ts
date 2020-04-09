import { Suppli } from "./Suppli";

export type ISuppliAmountValues = Omit<SuppliAmount, "suppli">;
export class SuppliAmount {
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
