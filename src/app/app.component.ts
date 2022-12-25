import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  restrictedUsernames = ['ADMIN', 'admin'];
  restrictedEmails = ['test@test.com', 'admin@test.com'];

  ngOnInit(): void {
    // Validations:- username (required, min length of 6 characters), email (required, valid email)
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.isUsernameRestricted.bind(this),
      ]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        this.isEmailRestricted.bind(this)
      ),
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

  onSuggestUsername() {
    // this.signupForm.setValue({
    //   username: 'TestUser1234',
    //   email: this.signupForm.value.email,
    //   address: {
    //     city: this.signupForm.value.address.city,
    //     state: this.signupForm.value.address.state,
    //   },
    //   skills: this.signupForm.value.skills,
    // });

    this.signupForm.patchValue({
      username: 'TestUser123456',
    });
  }

  onAddSkill() {
    const control = new FormControl('', Validators.required);
    (this.signupForm.get('skills') as FormArray).push(control);
  }

  // The number of inputs that will be displayed depends on the number of controls inside skills which is a FormArray
  getControls() {
    return (this.signupForm.get('skills') as FormArray).controls;
  }

  onDeleteSkill(index: number) {
    (this.signupForm.get('skills') as FormArray).removeAt(index);
  }

  handleSubmit() {
    console.log(this.signupForm);
  }

  isUsernameRestricted(control: FormControl): { [key: string]: boolean } {
    // If you return an object the control will be invalid else if you return null the control will be valid
    const value = control.value;
    if (this.restrictedUsernames.includes(value)) {
      return {
        restricted: true,
      };
    } else {
      return null;
    }
  }

  isEmailRestricted(control: FormControl): Promise<any> | Observable<any> {
    const value = control.value;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.restrictedEmails.includes(value)) {
          resolve({
            restrictedEmail: true,
          });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
