import { MasterRepository } from "../repository/index";
export declare const repository: () => MasterRepository;
export declare const logger: () => {
    setConfig: (config: {
        logwriter?: import("gas-lib/Log").Logwriter;
        logRule?: import("gas-lib/Log").LogRule;
        modePriority?: import("gas-lib/Log").ModePriority;
        mode?: "test" | "production" | "development";
        useBuffer?: boolean;
    }) => void;
    debug: (data: unknown) => void;
    info: (data: unknown) => void;
    warn: (data: unknown) => void;
    error: (data: unknown) => void;
    critical: (data: unknown) => void;
    flush: () => void;
};
