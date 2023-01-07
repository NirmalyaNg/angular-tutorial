import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderData } from '../models/order-data.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/api/orders/';
  constructor(private http: HttpClient, private auth: AuthService) {}

  public createOrder(orderData: OrderData) {
    return this.http.post(this.baseUrl, orderData);
  }

  public removeOrder(orderId: string) {
    return this.http.delete(this.baseUrl + orderId);
  }

  public fetchOrders(): Observable<OrderData[]> {
    const userId = this.auth.userSubject.getValue().id;
    return this.http.get<OrderData[]>(this.baseUrl + userId);
  }
}
