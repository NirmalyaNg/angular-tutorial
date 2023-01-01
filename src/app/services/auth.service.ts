import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAPIKEY = 'AIzaSyCfM0qcgP5OdAZcIsxFf_oitrMnHASc9ik';
  public userSubject = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseAPIKEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((authResponse) => {
          /*
        new Date().getTime() --> gives us the current date in miliseconds
        authResponse.expiresIn --> number of seconds in which the token will expire (in string)
        +authResponse.expiresIn --> number of seconds in which the token will expire (in number)
        +authResponse.expiresIn * 1000 --> number of miliseconds in which the token will expire (in number)
        new Date().getTime() + (+authResponse.expiresIn * 1000) --> total time in miliseconds after which token will expire
        new Date(new Date().getTime() + (+authResponse.expiresIn * 1000))  --> expiration date of the token
      */
          const expirationDate = new Date(
            new Date().getTime() + +authResponse.expiresIn * 1000
          );
          const user = new User(
            authResponse.localId,
            authResponse.email,
            authResponse.idToken,
            expirationDate
          );

          this.userSubject.next(user);
        })
      );
  }

  logout() {
    this.userSubject.next(null);
  }
}
