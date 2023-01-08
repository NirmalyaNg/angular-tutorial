import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminActions {
  private baseUrl = 'http://localhost:3000/api/dashboard/';
  constructor(private http: HttpClient) {}

  public getDashBoardData() {
    return this.http.get(this.baseUrl);
  }
}
