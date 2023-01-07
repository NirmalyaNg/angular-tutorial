import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { OrderData } from '../models/order-data.model';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<OrderData[]> {
  constructor(private order: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): OrderData[] | Observable<OrderData[]> | Promise<OrderData[]> {
    return this.order.fetchOrders();
  }
}
