import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  genders = ['Male', 'Female', 'Others'];
  selectedGender = 'Female';
  selectedCity = 'Kolkata';
  selectedState = 'West Bengal';

  constructor() {}

  ngOnInit(): void {}

  handleFormSubmit() {
    console.log(this.signupForm);
  }

  handleReset() {
    this.signupForm.reset({
      gender: this.selectedGender,
      address: {
        city: this.selectedCity,
        state: this.selectedState,
      },
    });
  }

  populateDefault() {
    this.signupForm.setValue({
      username: 'DefaultUsername',
      password: 'DefaultPassword',
      email: 'abcd@example.com',
      gender: 'Male',
      address: {
        city: 'Pune',
        state: 'West Bengal',
      },
    });
  }

  handleUsernameSuggest() {
    this.signupForm.form.patchValue({
      username: 'New Username',
    });
  }

  isControlValid(controlName: string): boolean {
    return this.signupForm.form.get(controlName).valid;
  }
}
