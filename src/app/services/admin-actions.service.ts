import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardData } from '../resolvers/dashboard.resolver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminActions {
  private baseUrl = 'http://localhost:3000/api/dashboard/';
  constructor(private http: HttpClient) {}

  public getDashBoardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.baseUrl);
  }
}
