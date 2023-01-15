import { Component, OnInit } from '@angular/core';
import { OrderData } from 'src/app/models/order-data.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: OrderData[] = [];
  constructor(private order: OrderService) {}

  ngOnInit(): void {
    this.order.fetchAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
    });
  }
}
