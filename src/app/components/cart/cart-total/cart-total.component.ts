import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css'],
})
export class CartTotalComponent implements OnInit, OnDestroy {
  total: number;
  isAuthenticated: boolean = false;
  subscriptions = new Subscription();
  constructor(private cart: CartService, private auth: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.auth.userSubject.subscribe((user) => {
        this.isAuthenticated = !!user;
      })
    );
    this.subscriptions.add(
      this.cart.cartItems
        .pipe(
          map((items) => {
            return items.map((item) => item.price * item.quantity);
          })
        )
        .subscribe((priceArr) => {
          this.total = priceArr.reduce((p1, p2) => p1 + p2, 0);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
