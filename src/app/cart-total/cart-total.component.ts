import { Component, OnInit } from '@angular/core';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css'],
})
export class CartTotalComponent implements OnInit {
  totalPrice: number;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.totalPrice = this.cartService.getTotalCartPrice();
    // This will be executed only once
    // this.totalPrice = this.cartService.getTotalCartPrice();

    // This will be executed every time the event emitter is emitted from
    // the cartService so that each time any product is added to the cart or existing
    // product is added the total Price is recalculated and updated in this component
    this.cartService.cartItemsChanged.subscribe(() => {
      this.totalPrice = this.cartService.getTotalCartPrice();
    });
  }
}
