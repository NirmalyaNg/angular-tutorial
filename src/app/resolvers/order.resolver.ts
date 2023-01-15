import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { OrderData } from '../models/order-data.model';
import { OrderService } from '../services/order.service';

@Injectable({ providedIn: 'root' })
export class OrderResolver implements Resolve<OrderData> {
  constructor(private order: OrderService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<OrderData> | Promise<OrderData> | OrderData {
    const orderId = route.params.id;
    return this.order.fetchOrder(orderId).pipe(
      catchError((error) => {
        this.router.navigate(['/admin']);
        return throwError(() => of(null));
      })
    );
  }
}
