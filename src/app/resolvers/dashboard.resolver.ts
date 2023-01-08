import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminActions } from '../services/admin-actions.service';
import { Injectable } from '@angular/core';

export interface DashboardData {
  orders: number;
  income: number;
  users: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<DashboardData> {
  constructor(private admin: AdminActions) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): DashboardData | Observable<DashboardData> | Promise<DashboardData> {
    return this.admin.getDashBoardData();
  }
}
