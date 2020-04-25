import { filter, find } from "underscore";
import { Datastore } from "../datastore/Datastore";
import {
  Form,
  IFormValues,
  IIntakeValues,
  IMakerValues,
  Intake,
  ISuppliAmountValues,
  ISuppliValues,
  ITimingValues,
  ITypeValues,
  Maker,
  Suppli,
  SuppliAmount,
  Timing,
  Type
} from "../model/index";
export class MasterRepository {
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
  getIntakeById(id: number) {
    const intakes = this.datastore.fetchIntake();
    const fIntake = find(intakes, i => i.id === id);
    if (!fIntake) {
      return undefined;
    }
    return this.createIntake(fIntake);
  }
  getIntakesByTypeId(typeId: number) {
    const intakes = this.datastore.fetchIntake();
    return filter(intakes, i => i.typeId === typeId).map<Intake>(i => this.createIntake(i));
  }
  getIntakesByTimingId(timingId: number) {
    const intakes = this.datastore.fetchIntake();
    return filter(intakes, i => i.timingId === timingId).map<Intake>(i => this.createIntake(i));
  }

  getForms() {
    const forms = this.datastore.fetchForm();
    return forms.map<Form>(f => this.createForm(f));
  }

  updateIntakes(intakes: Array<Intake | IIntakeValues>) {
    const intakeValues = intakes.map<IIntakeValues>(i => {
      if (i instanceof Intake) {
        return {
          id: i.id,
          serving: i.serving,
          timingId: i.timingId,
          typeId: i.typeId
        };
      }
      return i;
    });
    this.datastore.updateIntakes(intakeValues);
  }
  createType(type: ITypeValues) {
    return new Type(
      type,
      () => this.getSupplisByTypeId(type.id),
      () => this.getIntakesByTypeId(type.id)
    );
  }
  createSuppli(suppli: ISuppliValues) {
    return new Suppli(
      suppli,
      () => this.getTypeById(suppli.typeId),
      () => this.getMakerById(suppli.makerId),
      () => this.getSuppliAmountsBySuppliId(suppli.id)
    );
  }
  createMaker(maker: IMakerValues) {
    return new Maker(maker, () => this.getSupplisByMakerId(maker.id));
  }
  createSuppliAmounts(suppliAmount: ISuppliAmountValues) {
    return new SuppliAmount(suppliAmount, () => this.getSuppliById(suppliAmount.suppliId));
  }
  createTiming(timing: ITimingValues) {
    return new Timing(timing, () => this.getIntakesByTimingId(timing.id));
  }
  createIntake(intake: IIntakeValues) {
    return new Intake(
      intake,
      () => this.getTimingById(intake.timingId),
      () => this.getTypeById(intake.typeId)
    );
  }
  createForm(form: IFormValues) {
    return new Form(form, () => this.getIntakeById(form.intakeId));
  }
}
