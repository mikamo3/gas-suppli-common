"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Form = /** @class */ (function () {
    function Form(form, getIntake) {
        this.id = form.id;
        this.intakeId = form.intakeId;
        this.formId = form.formId;
        this.getIntake = getIntake;
    }
    Object.defineProperty(Form.prototype, "intake", {
        get: function () {
            return this.getIntake();
        },
        enumerable: true,
        configurable: true
    });
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=Form.js.map