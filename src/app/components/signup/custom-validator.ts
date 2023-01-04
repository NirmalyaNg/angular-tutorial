import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  constructor() {}

  static isPasswordMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const control: AbstractControl = group.get(controlName);
      const matchingControl: AbstractControl = group.get(matchingControlName);

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({
          mustMatch: true,
        });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
