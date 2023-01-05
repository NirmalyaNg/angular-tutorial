import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  items: Product[] = [];
  subscriptions = new Subscription();
  constructor(private cart: CartService, private auth: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.auth.userSubject.subscribe((user) => {
        this.isAuthenticated = !!user;
      })
    );
    this.subscriptions.add(
      this.cart.cartItems.subscribe((items) => {
        this.items = items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
