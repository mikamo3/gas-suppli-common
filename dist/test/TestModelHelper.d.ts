export declare const createTypeValues: (id?: number, name?: string) => Pick<import("../model").Type, "id" | "name">;
export declare const createSuppliValues: (id?: number, typeId?: number, makerId?: number, name?: string, amountPerServing?: number, servingUnit?: string) => Pick<import("../model").Suppli, "id" | "name" | "makerId" | "typeId" | "amountPerServing" | "servingUnit">;
export declare const createSuppliAmountValues: (id?: number, suppliId?: number, amount?: number) => Pick<import("../model").SuppliAmount, "id" | "amount" | "suppliId">;
export declare const createMakerValues: (id?: number, name?: string) => Pick<import("../model").Maker, "id" | "name">;
export declare const createTimingValues: (id?: number, name?: string) => Pick<import("../model").Timing, "id" | "name">;
export declare const createIntakeValues: (id?: number, timingId?: number, typeId?: number, serving?: number) => Pick<import("../model").Intake, "id" | "typeId" | "serving" | "timingId">;
