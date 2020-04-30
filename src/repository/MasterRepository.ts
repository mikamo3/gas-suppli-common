import { filter, find } from "underscore";
import { Datastore } from "datastore/Datastore";
import {
  IIntakeValues,
  Intake,
  Maker,
  Suppli,
  SuppliAmount,
  Timing,
  Type,
  IntakeDetail,
  IIntakeDetailValues
} from "model/index";
import {
  createType,
  createSuppli,
  createIntake,
  createMaker,
  createSuppliAmounts,
  createTiming
} from "model/relation";
export class MasterRepository {
  datastore: Datastore;
  constructor(datastore: Datastore) {
    this.datastore = datastore;
  }
  getTypes(): Type[] {
    return this.datastore.fetchType().map<Type>(t => createType(t, this));
  }
  getTypeById(id: number): Type {
    const type = this.getFirstBy("id", id, this.datastore.fetchType());
    return type ? createType(type, this) : undefined;
  }
  getSupplis() {
    return this.datastore.fetchSuppli().map<Suppli>(s => createSuppli(s, this));
  }
  getSuppliById(id: number) {
    const suppli = this.getFirstBy("id", id, this.datastore.fetchSuppli());
    return suppli ? createSuppli(suppli, this) : undefined;
  }
  getSupplisByTypeId(typeId: number): Suppli[] {
    return this.getBy("typeId", typeId, this.datastore.fetchSuppli()).map<Suppli>(fs =>
      createSuppli(fs, this)
    );
  }
  getSupplisByMakerId(makerId: number): Suppli[] {
    return this.getBy("makerId", makerId, this.datastore.fetchSuppli()).map<Suppli>(fs =>
      createSuppli(fs, this)
    );
  }

  getMakers(): Maker[] {
    return this.datastore.fetchMaker().map<Maker>(m => createMaker(m, this));
  }

  getMakerById(id: number): Maker {
    const maker = this.getFirstBy("id", id, this.datastore.fetchMaker());
    return maker ? createMaker(maker, this) : undefined;
  }
  getMakerByName(name: string): Maker {
    const maker = this.getFirstBy("name", name, this.datastore.fetchMaker());
    return maker ? createMaker(maker, this) : undefined;
  }

  getSuppliAmounts(): SuppliAmount[] {
    return this.datastore
      .fetchSuppliAmount()
      .map<SuppliAmount>(sa => createSuppliAmounts(sa, this));
  }
  getSuppliAmountsBySuppliId(suppliId: number): SuppliAmount[] {
    return this.getBy("suppliId", suppliId, this.datastore.fetchSuppliAmount()).map<SuppliAmount>(
      sa => createSuppliAmounts(sa, this)
    );
  }

  getTimings(): Timing[] {
    return this.datastore.fetchTiming().map<Timing>(t => createTiming(t, this));
  }

  getTimingById(id: number): Timing {
    const timing = this.getFirstBy("id", id, this.datastore.fetchTiming());
    return timing ? createTiming(timing, this) : undefined;
  }
  getTimingByName(name: string): Timing {
    const timing = this.getFirstBy("name", name, this.datastore.fetchTiming());
    return timing ? createTiming(timing, this) : undefined;
  }

  getIntakes() {
    return this.datastore.fetchIntake().map<Intake>(i => createIntake(i, this));
  }
  getIntakeById(id: number) {
    const intake = this.getFirstBy("id", id, this.datastore.fetchIntake());
    return intake ? createIntake(intake, this) : undefined;
  }
  getIntakesByTypeId(typeId: number) {
    return this.getBy("typeId", typeId, this.datastore.fetchIntake()).map<Intake>(i =>
      createIntake(i, this)
    );
  }
  getIntakesByTimingId(timingId: number) {
    return this.getBy("timingId", timingId, this.datastore.fetchIntake()).map<Intake>(i =>
      createIntake(i, this)
    );
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
  private getFirstBy<T>(key: keyof T, search: unknown, data: T[]) {
    return find(data, d => d[key] === search);
  }
  private getBy<T>(key: keyof T, search: unknown, data: T[]) {
    return filter(data, d => d[key] === search);
  }
}
