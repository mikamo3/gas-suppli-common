import { ITypeValues, Type } from "./Type";
import { MasterRepository } from "repository/index";
import { IMakerValues, Maker } from "./Maker";
import { ISuppliValues, Suppli } from "./Suppli";
import { ISuppliAmountValues, SuppliAmount } from "./SuppliAmount";
import { ITimingValues, Timing } from "./Timing";
import { IIntakeValues, Intake } from "./Intake";

export const createType = (type: ITypeValues, repository: MasterRepository) => {
  return new Type(
    type,
    () => repository.getSupplisByTypeId(type.id),
    () => repository.getIntakesByTypeId(type.id)
  );
};

export const createSuppli = (suppli: ISuppliValues, repository: MasterRepository) => {
  return new Suppli(
    suppli,
    () => repository.getTypeById(suppli.typeId),
    () => repository.getMakerById(suppli.makerId),
    () => repository.getSuppliAmountsBySuppliId(suppli.id)
  );
};
export const createMaker = (maker: IMakerValues, repository: MasterRepository) => {
  return new Maker(maker, () => repository.getSupplisByMakerId(maker.id));
};
export const createSuppliAmounts = (
  suppliAmount: ISuppliAmountValues,
  repository: MasterRepository
) => {
  return new SuppliAmount(suppliAmount, () => repository.getSuppliById(suppliAmount.suppliId));
};
export const createTiming = (timing: ITimingValues, repository: MasterRepository) => {
  return new Timing(timing, () => repository.getIntakesByTimingId(timing.id));
};
export const createIntake = (intake: IIntakeValues, repository: MasterRepository) => {
  return new Intake(
    intake,
    () => repository.getTimingById(intake.timingId),
    () => repository.getTypeById(intake.typeId)
  );
};
