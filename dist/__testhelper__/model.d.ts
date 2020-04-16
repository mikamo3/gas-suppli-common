export declare const createType: (id?: number, name?: string) => Pick<import("../src/model").Type, "id" | "name">;
export declare const createSuppli: (id?: number, typeId?: number, makerId?: number, name?: string, amountPerServing?: number, servingUnit?: string) => Pick<import("../src/model").Suppli, "id" | "name" | "makerId" | "typeId" | "amountPerServing" | "servingUnit">;
export declare const createSuppliAmount: (id?: number, suppliId?: number, amount?: number) => Pick<import("../src/model").SuppliAmount, "id" | "amount" | "suppliId">;
export declare const createMaker: (id?: number, name?: string) => Pick<import("../src/model").Maker, "id" | "name">;
export declare const createTiming: (id?: number, name?: string) => Pick<import("../src/model").Timing, "id" | "name">;
export declare const createIntake: (id?: number, timingId?: number, typeId?: number, serving?: number) => Pick<import("../src/model").Intake, "id" | "typeId" | "serving" | "timingId">;
