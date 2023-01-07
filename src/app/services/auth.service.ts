import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, Observable, exhaustMap, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject = new BehaviorSubject<User>(null);
  public baseUrl: string = 'http://localhost:3000/api/auth/';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponse>(this.baseUrl + 'login', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        exhaustMap((authResponse) => {
          this.handleAuthenticationSuccess(authResponse);
          return this.http.get(
            'http://localhost:3000/api/cart/' + authResponse.user._id,
            {
              headers: {
                Authorization: `Bearer ${authResponse.token}`,
              },
            }
          );
        })
      );
  }

  signup(username: string, email: string, password: string) {
    return this.http.post(this.baseUrl + 'signup', {
      username,
      email,
      password,
    });
  }

  isUsernameTaken(username: string): Observable<{ [key: string]: boolean }> {
    return this.http.post<{ [key: string]: boolean }>(
      this.baseUrl + 'checkUsername',
      {
        username,
      }
    );
  }

  isEmailTaken(email: string): Observable<{ [key: string]: boolean }> {
    return this.http.post<{ [key: string]: boolean }>(
      this.baseUrl + 'checkEmail',
      {
        email,
      }
    );
  }

  autoLogin() {
    const userData = localStorage.getItem('authUser');
    if (!userData) {
      return;
    }
    const storedUserObj: {
      id: string;
      email: string;
      username: string;
      _token: string;
      _expirationDate: string;
    } = JSON.parse(userData);
    const expirationDate = new Date(storedUserObj._expirationDate);
    const storedUser = new User(
      storedUserObj.id,
      storedUserObj.email,
      storedUserObj.username,
      storedUserObj._token,
      expirationDate
    );
    if (!storedUser.token) {
      this.logout();
    } else {
      this.userSubject.next(storedUser);
    }
  }

  logout() {
    return this.http.post(this.baseUrl + 'logout', null).pipe(
      tap(() => {
        localStorage.removeItem('authUser');
        this.userSubject.next(null);
      })
    );
  }

  private handleAuthenticationSuccess(authResponse: AuthResponse) {
    /*
        new Date().getTime() --> gives us the current date in miliseconds
        authResponse.expiresIn --> number of seconds in which the token will expire (in string)
        +authResponse.expiresIn --> number of seconds in which the token will expire (in number)
        +authResponse.expiresIn * 1000 --> number of miliseconds in which the token will expire (in number)
        new Date().getTime() + (+authResponse.expiresIn * 1000) --> total time in miliseconds after which token will expire
        new Date(new Date().getTime() + (+authResponse.expiresIn * 1000))  --> expiration date of the token
      */
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new User(
      authResponse.user._id,
      authResponse.user.email,
      authResponse.user.username,
      authResponse.token,
      expirationDate
    );
    localStorage.setItem('authUser', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
