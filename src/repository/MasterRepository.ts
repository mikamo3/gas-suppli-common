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
  Type,
  IntakeDetail,
  IIntakeDetailValues
} from "../model/index";
import { HasId, HasName } from "model/common";
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
    return this.getById(id, types, this.createType);
  }
  getSupplis() {
    const supplis = this.datastore.fetchSuppli();
    return supplis.map<Suppli>(s => this.createSuppli(s));
  }
  getSuppliById(id: number) {
    const supplis = this.datastore.fetchSuppli();
    return this.getById(id, supplis, this.createSuppli);
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
    return this.getById(id, makers, this.createMaker);
  }
  getMakerByName(name: string): Maker {
    const makers = this.datastore.fetchMaker();
    return this.getByName(name, makers, this.createMaker);
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
    return this.getById(id, timings, this.createTiming);
  }
  getTimingByName(name: string): Timing {
    const timings = this.datastore.fetchTiming();
    return this.getByName(name, timings, this.createTiming);
  }
  getIntakes() {
    const intakes = this.datastore.fetchIntake();
    return intakes.map<Intake>(i => this.createIntake(i));
  }
  getIntakeById(id: number) {
    const intakes = this.datastore.fetchIntake();
    return this.getById(id, intakes, this.createIntake);
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
  addIntakeDetails(intakeDetails: Array<IntakeDetail | IIntakeDetailValues>) {
    const intakeDetailValues = intakeDetails.map<IIntakeDetailValues>(id => {
      if (id instanceof IntakeDetail) {
        return {
          date: id.date,
          serving: id.serving,
          suppliId: id.suppliId,
          timingId: id.timingId
        };
      }
      return id;
    });
    this.datastore.addIntakeDetails(intakeDetailValues);
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
  private getById<T extends HasId, Y>(id: number, data: T[], create: (data: T) => Y): Y {
    const findData = find(data, d => d.id === id);
    if (findData) {
      return create(findData);
    }
    return undefined;
  }
  private getByName<T extends HasName, Y>(name: string, data: T[], create: (data: T) => Y): Y {
    const findData = find(data, d => d.name === name);
    if (findData) {
      return create(findData);
    }
    return undefined;
  }
}
