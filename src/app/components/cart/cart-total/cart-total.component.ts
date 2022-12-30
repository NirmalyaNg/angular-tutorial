import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css'],
})
export class CartTotalComponent implements OnInit {
  total: number;
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.cartItemsChanged
      .pipe(
        map((items) => {
          return items.map((item) => item.price * item.quantity);
        })
      )
      .subscribe((priceArr) => {
        this.total = priceArr.reduce((p1, p2) => p1 + p2, 0);
      });
  }
}
