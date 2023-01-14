import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { AuthService } from './auth.service';

export interface User {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/api/users/';
  constructor(private http: HttpClient, private auth: AuthService) {}

  public fetchUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl + 'all')
      .pipe(
        map((users) =>
          users.filter(
            (user) => user._id !== this.auth.userSubject.getValue().id
          )
        )
      );
  }

  public editIsAdmin(id: string, status: boolean) {
    return this.http.patch(this.baseUrl + 'adminActions/' + id, {
      status,
    });
  }
}
