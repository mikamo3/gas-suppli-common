import { Datastore } from "src/datastore/Datastore";
import { filter, find } from "underscore";
import { Type, ITypeValues } from "src/model/Type";
import { Suppli, ISuppliValues } from "src/model/Suppli";
import { Maker, IMakerValues } from "src/model/Maker";
import { SuppliAmount, ISuppliAmountValues } from "src/model/SuppliAmount";
import { Timing, ITimingValues } from "src/model/Timing";
import { Intake, IIntakeValues } from "src/model/Intake";
export default class MasterRepository {
  datastore: Datastore;
  constructor(datastore: Datastore) {
    this.datastore = datastore;
  }
  getTypes(): Type[] {
    const types = this.datastore.fetchType();
    return types.map<Type>(t => this.createType(t));
  }
  getTypeById(id: number): Type {
    const types = this.datastore.fetchType();
    const type = find(types, f => f.id === id);
    if (!type) {
      return undefined;
    }
    return this.createType(type);
  }
  getSupplis() {
    const supplis = this.datastore.fetchSuppli();
    return supplis.map<Suppli>(s => this.createSuppli(s));
  }
  getSuppliById(id: number) {
    const supplis = this.datastore.fetchSuppli();
    const fSuppli = find(supplis, s => s.id === id);
    if (!fSuppli) {
      return undefined;
    }
    return this.createSuppli(fSuppli);
  }
  getSupplisByTypeId(typeId: number): Suppli[] {
    const supplis = this.datastore.fetchSuppli();
    const fSupplis = filter(supplis, s => s.typeId === typeId);
    return fSupplis.map<Suppli>(fs => this.createSuppli(fs));
  }
  getSupplisByMakerId(makerId: number): Suppli[] {
    const supplis = this.datastore.fetchSuppli();
    const fSupplis = filter(supplis, s => s.makerId === makerId);
    return fSupplis.map<Suppli>(fs => this.createSuppli(fs));
  }

  getMakers(): Maker[] {
    const makers = this.datastore.fetchMaker();
    return makers.map<Maker>(m => this.createMaker(m));
  }

  getMakerById(id: number): Maker {
    const makers = this.datastore.fetchMaker();
    const maker = find(makers, m => m.id === id);
    if (!maker) {
      return undefined;
    }
    return this.createMaker(maker);
  }

  getSuppliAmounts(): SuppliAmount[] {
    const suppliAmounts = this.datastore.fetchSuppliAmount();
    return suppliAmounts.map<SuppliAmount>(sa => this.createSuppliAmounts(sa));
  }
  getSuppliAmountsBySuppliId(suppliId: number): SuppliAmount[] {
    const suppliAmounts = this.datastore.fetchSuppliAmount();
    return filter(suppliAmounts, sa => sa.suppliId === suppliId).map<SuppliAmount>(sa =>
      this.createSuppliAmounts(sa)
    );
  }

  getTimings(): Timing[] {
    const timings = this.datastore.fetchTiming();
    return timings.map<Timing>(t => this.createTiming(t));
  }

  getTimingById(id: number): Timing {
    const timings = this.datastore.fetchTiming();
    const fTiming = find(timings, t => t.id === id);
    if (!fTiming) {
      return undefined;
    }
    return this.createTiming(fTiming);
  }

  getIntakes() {
    const intakes = this.datastore.fetchIntake();
    return intakes.map<Intake>(i => this.createIntake(i));
  }
  getIntakesByTimingId(timingId: number) {
    const intakes = this.datastore.fetchIntake();
    return filter(intakes, i => i.timingId === timingId).map<Intake>(i => this.createIntake(i));
  }

  private createType(type: ITypeValues) {
    return new Type(type, () => this.getSupplisByTypeId(type.id));
  }
  private createSuppli(suppli: ISuppliValues) {
    return new Suppli(
      suppli,
      () => this.getTypeById(suppli.typeId),
      () => this.getMakerById(suppli.makerId),
      () => this.getSuppliAmountsBySuppliId(suppli.id)
    );
  }
  private createMaker(maker: IMakerValues) {
    return new Maker(maker, () => this.getSupplisByMakerId(maker.id));
  }
  private createSuppliAmounts(suppliAmount: ISuppliAmountValues) {
    return new SuppliAmount(suppliAmount, () => this.getSuppliById(suppliAmount.suppliId));
  }
  private createTiming(timing: ITimingValues) {
    return new Timing(timing, () => this.getIntakesByTimingId(timing.id));
  }
  private createIntake(intake: IIntakeValues) {
    return new Intake(
      intake,
      () => this.getTimingById(intake.timingId),
      () => this.getTypeById(intake.typeId)
    );
  }
}
