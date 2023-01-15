import { AbstractControl } from '@angular/forms';
export class CustomValidators {
  constructor() {}

  static isMatchingControl(controlName: string, matchingControlName: string) {
    return (formgroup: AbstractControl): any => {
      const control = formgroup.get(controlName);
      const matchingControl = formgroup.get(matchingControlName);

      // If the matchingControl is already invalid due to some other validators except isMatchingControl
      // matchingControl.errors --> The macthingControl is already invalid
      // !matchingControl.errors.isMatch --> The matchingControl is already invalid due to
      // some other error except isMatch which is set by isMatchingControl validator

      /*
        Validators         Error Key added in errors object
        -------------     -----------------------------------
        required          { required : true }
        email             { email : true }
        minLength          { minlength: true }
        min                { min: true }
        max                { max: true }

        isMatchingControl  { isMatch: true }
      */
      if (matchingControl.errors && !matchingControl.errors.isMatch) {
        // This means that the matchingControl is invalid and its invalid due to some other vaidator
        return;
      } else {
        if (control.value === matchingControl.value) {
          // Both are same
          matchingControl.setErrors(null);
        } else {
          // Both are not same
          matchingControl.setErrors({
            isMatch: true,
          });
        }
      }
    };
  }
}
