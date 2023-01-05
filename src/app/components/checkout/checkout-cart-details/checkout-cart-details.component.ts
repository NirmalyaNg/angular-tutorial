import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-cart-details',
  templateUrl: './checkout-cart-details.component.html',
  styleUrls: ['./checkout-cart-details.component.css'],
})
export class CheckoutCartDetailsComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  subscriptions = new Subscription();
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cart.cartItems.subscribe((items) => {
        this.cartItems = items;
      })
    );
  }

  getTotalPrice() {
    return this.cartItems
      .map((item) => item.price)
      .reduce((p1, p2) => p1 + p2, 0)
      .toFixed(2);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
