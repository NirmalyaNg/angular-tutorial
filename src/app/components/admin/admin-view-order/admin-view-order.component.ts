import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { OrderData } from 'src/app/models/order-data.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.css'],
})
export class AdminViewOrderComponent implements OnInit {
  loadedOrder: OrderData = null;
  constructor(private route: ActivatedRoute, private order: OrderService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.loadedOrder = data.order;
      console.log(this.loadedOrder);
    });
  }

  public getAddressLine() {
    return `${this.loadedOrder.address.line}, ${this.loadedOrder.address.city}-${this.loadedOrder.address.pincode}, ${this.loadedOrder.address.state}, ${this.loadedOrder.address.country}`;
  }

  public onConfirm() {
    this.order.confirmOrder(this.loadedOrder._id).subscribe({
      next: (order) => {
        this.loadedOrder = order;
      },
    });
  }
}
