import { Intake } from "./Intake";
export declare type IFormValues = Omit<Form, "intake">;
export declare class Form {
    id: number;
    intakeId: number;
    formId: string;
    private getIntake;
    get intake(): Intake;
    constructor(form: IFormValues, getIntake: () => Intake);
}
