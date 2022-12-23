import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit(): void {
    // Validations:- username (required, min length of 6 characters), email (required, valid email)
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        city: new FormControl('Kolkata', Validators.required),
        state: new FormControl('West Bengal', Validators.required),
      }),
      skills: new FormArray([]),
    });

    // this.signupForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signupForm.get('email').statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupForm.get('email').valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onAddSkill() {
    const control = new FormControl('', Validators.required);
    (this.signupForm.get('skills') as FormArray).push(control);
  }

  getControls() {
    return (this.signupForm.get('skills') as FormArray).controls;
  }

  onDeleteSkill(index: number) {
    (this.signupForm.get('skills') as FormArray).removeAt(index);
  }

  handleSubmit() {
    console.log(this.signupForm);
  }
}
