import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/categories/';
  constructor(private http: HttpClient, private auth: AuthService) {}

  public addCategory(name: string): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      this.baseUrl,
      {
        name,
      },
      {
        headers: new HttpHeaders({
          Authorization: this.auth.userSubject.getValue().token,
        }),
      }
    );
  }

  public deleteCategory(id: string) {
    return this.http.delete(this.baseUrl + id, {
      headers: new HttpHeaders({
        Authorization: this.auth.userSubject.getValue().token,
      }),
    });
  }
}
