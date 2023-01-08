import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, Observable, concatMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { CartService } from './cart.service';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject = new BehaviorSubject<User>(null);
  public baseUrl: string = 'http://localhost:3000/api/auth/';
  constructor(private http: HttpClient, private cart: CartService) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponse>(this.baseUrl + 'login', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        concatMap((authResponse) => {
          this.handleAuthenticationSuccess(authResponse);
          return this.cart.fetchCart(authResponse.user._id);
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
      isAdmin: boolean;
    } = JSON.parse(userData);
    const expirationDate = new Date(storedUserObj._expirationDate);
    const storedUser = new User(
      storedUserObj.id,
      storedUserObj.email,
      storedUserObj.username,
      storedUserObj._token,
      expirationDate,
      storedUserObj.isAdmin
    );
    if (!storedUser.token) {
      this.logout();
    } else {
      this.userSubject.next(storedUser);
      this.cart.fetchCart(storedUser.id).subscribe({
        next: (res: Cart) => {
          this.cart.emitCartUpdates(res.products);
        },
      });
    }
  }

  logout() {
    return this.http.post(this.baseUrl + 'logout', null).pipe(
      tap(() => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('cart');
        this.cart.clearLocalCart();
        this.userSubject.next(null);
      })
    );
  }

  checkAdmin() {
    return this.http.post(this.baseUrl + 'checkAdmin', null);
  }

  private handleAuthenticationSuccess(authResponse: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new User(
      authResponse.user._id,
      authResponse.user.email,
      authResponse.user.username,
      authResponse.token,
      expirationDate,
      authResponse.user.isAdmin
    );
    localStorage.setItem('authUser', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
