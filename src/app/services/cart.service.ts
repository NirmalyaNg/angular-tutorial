import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemsChanged = new BehaviorSubject<Product[]>([]);
  public cartItemsCountChanged = new BehaviorSubject<number>(0);

  addToCart(product: Product) {
    let { items, count } = this.getPreviousValues();
    const p = items.find((item) => item._id === product._id);
    if (p) {
      p.quantity++;
    } else {
      items.push({
        ...product,
        quantity: 1,
      });
    }
    count++;
    this.emitUpdates(items, count);
  }

  removeFromCart(id: string) {
    let { items, count } = this.getPreviousValues();
    const index = items.findIndex((item) => item._id === id);
    count -= items[index].quantity;
    items.splice(index, 1);
    this.emitUpdates(items, count);
  }

  increment(id: string) {
    let { items, count } = this.getPreviousValues();
    const product = items.find((item) => item._id === id);
    product.quantity++;
    count++;
    this.emitUpdates(items, count);
  }

  decrement(id: string) {
    let { items, count } = this.getPreviousValues();
    const product = items.find((item) => item._id === id);
    if (product.quantity > 1) {
      product.quantity--;
      count--;
    }
    this.emitUpdates(items, count);
  }

  private getPreviousValues() {
    return {
      items: this.cartItemsChanged.getValue(),
      count: this.cartItemsCountChanged.getValue(),
    };
  }

  private emitUpdates(updatedItems: Product[], updatedCount: number) {
    this.cartItemsCountChanged.next(updatedCount);
    this.cartItemsChanged.next(updatedItems.slice());
  }
}
