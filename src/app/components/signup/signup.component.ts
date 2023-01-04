import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from './custom-validator';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  usernameTimer: any = null;
  emailTimer: any = null;
  constructor(private auth: AuthService, private router: Router) {}
  get f() {
    return this.signupForm;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(
          '',
          Validators.required,
          this.isUsernameTaken.bind(this)
        ),
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          this.isEmailTaken.bind(this)
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      CustomValidators.isPasswordMatch('password', 'confirmPassword')
    );
  }

  isUsernameTaken(control: AbstractControl): Observable<any> | Promise<any> {
    clearTimeout(this.usernameTimer);
    const promise = new Promise((resolve, reject) => {
      this.usernameTimer = setTimeout(() => {
        this.auth.isUsernameTaken(control.value).subscribe((data) => {
          if (data && data.usernameTaken) {
            resolve({
              usernameTaken: true,
            });
          } else {
            resolve(null);
          }
        });
      }, 600);
    });
    return promise;
  }

  isEmailTaken(control: AbstractControl): Observable<any> | Promise<any> {
    clearTimeout(this.emailTimer);
    const promise = new Promise((resolve, reject) => {
      this.emailTimer = setTimeout(() => {
        this.auth.isEmailTaken(control.value).subscribe((data) => {
          if (data && data.emailTaken) {
            resolve({
              emailTaken: true,
            });
          } else {
            resolve(null);
          }
        });
      }, 500);
    });
    return promise;
  }

  handleSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const { username, email, password } = this.signupForm.value;
    this.auth.signup(username, email, password).subscribe({
      next: (res) => {
        this.signupForm.reset();
        this.router.navigate(['/login'], {
          state: {
            signupSuccess: true,
          },
        });
      },
    });
  }
}
