import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      CustomValidators.isMatchingControl('password', 'confirmPassword')
    );

    // If we want to add any custom validator we can add it to control level as well as formgroup level
    // If we add it to control level we will be able to access that particular control only
    // If we add it to formgroup level we will be able to access any control from the formgroup

    // this.signupForm = this.fb.group(
    //   {
    //     email: this.fb.control('', {
    //       validators: [Validators.email, Validators.required],
    //     }),
    //     password: this.fb.control('', {
    //       validators: [Validators.required, Validators.minLength(6)],
    //     }),
    //     confirmPassword: this.fb.control('', {
    //       validators: Validators.required,
    //     }),
    //   },
    //   {
    //     validators: CustomValidators.isMatchingControl(
    //       'password',
    //       'confirmPassword'
    //     ),
    //   }
    // );
  }

  // This method takes a control name as parameter and returns true if the control is touched and invalid else
  // returns false
  public isControlInvalid(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control.invalid && control.touched;
  }

  public getControlErrors(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control.errors;
  }
}
