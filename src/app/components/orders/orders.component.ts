import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderData } from 'src/app/models/order-data.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: OrderData[] = [];
  constructor(private route: ActivatedRoute, private order: OrderService) {}
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe((data) => {
        this.orders = data.orders;
      })
    );
  }

  onRemoveOrder(id: string) {
    const response = confirm('Are you sure you want to delete this order ?');
    if (!response) {
      return;
    }
    return this.order.removeOrder(id).subscribe({
      next: () => {
        this.orders = this.orders.filter((order) => order._id !== id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
