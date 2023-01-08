import { Injectable, Injector } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3000/api/cart/';
  public cartItems = new BehaviorSubject<Product[]>([]);
  public cartItemsCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private injector: Injector) {}

  public addToCart(prod: Product) {
    let items = this.cartItems.getValue().slice();
    let count = this.cartItemsCount.getValue();
    const product: Product = items.find((item) => item._id === prod._id);
    if (product) {
      product.quantity++;
    } else {
      items.push({ ...prod, quantity: 1 });
    }
    count++;
    const auth = this.injector.get(AuthService);
    const user = auth.userSubject.getValue();
    if (user) {
      this.saveCartToDB(items).subscribe({
        next: () => {
          this.emitCartUpdates(items);
        },
      });
    } else {
      localStorage.setItem('cart', JSON.stringify(items));
      this.emitCartUpdates(items);
    }
  }

  public removeFromCart(id: string) {
    let items = this.cartItems.getValue().slice();
    let count = this.cartItemsCount.getValue();
    const index = items.findIndex((item) => item._id === id);
    if (index >= 0) {
      count -= items[index].quantity;
      items.splice(index, 1);
      const auth = this.injector.get(AuthService);
      const user = auth.userSubject.getValue();
      if (user) {
        this.saveCartToDB(items).subscribe({
          next: () => {
            this.emitCartUpdates(items);
          },
        });
      } else {
        localStorage.setItem('cart', JSON.stringify(items));
        this.emitCartUpdates(items);
      }
    }
  }

  public increment(id: string) {
    let items = this.cartItems.getValue().slice();
    let count = this.cartItemsCount.getValue();
    const product = items.find((item) => item._id === id);
    product.quantity++;
    count++;
    this.emitCartUpdates(items);
  }

  public decrement(id: string) {
    let items = this.cartItems.getValue().slice();
    let count = this.cartItemsCount.getValue();
    const product = items.find((item) => item._id === id);
    if (product.quantity !== 1) {
      product.quantity--;
      count--;
      this.emitCartUpdates(items);
    }
  }

  public mergeCartAndSaveToDb(items: Product[]) {
    const mergedCart = [...items];
    const localCart: Product[] = JSON.parse(localStorage.getItem('cart'));
    if (localCart) {
      localCart.forEach((item) => {
        const isPresent = !!mergedCart.find(
          (product) => product._id === item._id
        );
        if (!isPresent) {
          mergedCart.push(item);
        }
      });
      this.saveCartToDB(mergedCart).subscribe({
        next: () => {
          this.emitCartUpdates(mergedCart);
        },
      });
    } else {
      this.emitCartUpdates(items);
    }
  }

  public fetchCart(userId: string) {
    return this.http.get(this.baseUrl + userId);
  }

  public clearLocalCart() {
    localStorage.removeItem('cart');
    this.emitCartUpdates([]);
  }

  public emitCartUpdates(items: Product[]) {
    const products = items ? items.slice() : [];
    const count = products
      .map((i) => i.quantity)
      .reduce((q1, q2) => q1 + q2, 0);
    this.cartItems.next(products);
    this.cartItemsCount.next(count);
  }

  private saveCartToDB(items: Product[]) {
    return this.http.post(this.baseUrl, items);
  }
}
