import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsCount: number = 0;
  public cartItemsChanged = new BehaviorSubject<Product[]>([]);
  public cartItemsCountChanged = new BehaviorSubject<number>(0);

  addToCart(product: Product) {
    const p = this.cartItems.find((item) => item.id === product.id);
    if (p) {
      p.quantity++;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1,
      });
    }
    this.cartItemsCount++;
    this.emitUpdates();
  }

  removeFromCart(id: number) {
    const index = this.cartItems.findIndex((item) => item.id === id);
    this.cartItemsCount -= this.cartItems[index].quantity;
    this.cartItems.splice(index, 1);
    this.emitUpdates();
  }

  increment(id: number) {
    const product = this.cartItems.find((item) => item.id === id);
    product.quantity++;
    this.cartItemsCount++;
    this.emitUpdates();
  }

  decrement(id: number) {
    const product = this.cartItems.find((item) => item.id === id);
    if (product.quantity > 1) {
      product.quantity--;
      this.cartItemsCount--;
    }
    this.emitUpdates();
  }

  private emitUpdates() {
    this.cartItemsCountChanged.next(this.cartItemsCount);
    this.cartItemsChanged.next(this.cartItems.slice());
  }
}
