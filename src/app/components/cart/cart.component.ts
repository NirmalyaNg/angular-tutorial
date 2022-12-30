import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../products/product/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  subscriptions = new Subscription();
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cart.cartItemsChanged.subscribe((items) => {
        this.items = items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
