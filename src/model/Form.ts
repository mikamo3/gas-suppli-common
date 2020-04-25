import { Intake } from "./Intake";

export type IFormValues = Omit<Form, "intake">;
export class Form {
  id: number;
  intakeId: number;
  formId: string;
  private getIntake: () => Intake;
  get intake() {
    return this.getIntake();
  }
  constructor(form: IFormValues, getIntake: () => Intake) {
    this.id = form.id;
    this.intakeId = form.intakeId;
    this.formId = form.formId;
    this.getIntake = getIntake;
  }
}
