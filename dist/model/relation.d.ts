import { Type } from "./Type";
import { MasterRepository } from "../repository/index";
import { Maker } from "./Maker";
import { Suppli } from "./Suppli";
import { SuppliAmount } from "./SuppliAmount";
import { Timing } from "./Timing";
import { Intake } from "./Intake";
export declare const createType: (type: Pick<Type, "id" | "name">, repository: MasterRepository) => Type;
export declare const createSuppli: (suppli: Pick<Suppli, "id" | "name" | "makerId" | "typeId" | "amountPerServing" | "servingUnit">, repository: MasterRepository) => Suppli;
export declare const createMaker: (maker: Pick<Maker, "id" | "name">, repository: MasterRepository) => Maker;
export declare const createSuppliAmounts: (suppliAmount: Pick<SuppliAmount, "id" | "amount" | "suppliId">, repository: MasterRepository) => SuppliAmount;
export declare const createTiming: (timing: Pick<Timing, "id" | "name">, repository: MasterRepository) => Timing;
export declare const createIntake: (intake: Pick<Intake, "id" | "typeId" | "serving" | "timingId">, repository: MasterRepository) => Intake;
