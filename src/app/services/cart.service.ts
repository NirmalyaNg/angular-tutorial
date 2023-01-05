import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, exhaustMap, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = new BehaviorSubject<Product[]>([]);
  public cartItemsCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private auth: AuthService) {}

  public addToCart(product: Product) {
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
    // Save cart to DB
    this.checkIfLoggedInThenEmitUpdates(items, count);
  }

  public removeFromCart(id: string) {
    let { items, count } = this.getPreviousValues();
    const index = items.findIndex((item) => item._id === id);
    count -= items[index].quantity;
    items.splice(index, 1);
    this.checkIfLoggedInThenEmitUpdates(items, count);
  }

  public increment(id: string) {
    let { items, count } = this.getPreviousValues();
    const product = items.find((item) => item._id === id);
    product.quantity++;
    count++;
    this.checkIfLoggedInThenEmitUpdates(items, count);
  }

  public decrement(id: string) {
    let { items, count } = this.getPreviousValues();
    const product = items.find((item) => item._id === id);
    if (product.quantity > 1) {
      product.quantity--;
      count--;
    }
    this.checkIfLoggedInThenEmitUpdates(items, count);
  }

  public setCartItemsOnLoad() {
    // Get the updated cart as JSON string from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems: Product[] = JSON.parse(storedCart);
      const cartCount = this.getCartItemsCount(cartItems);
      this.emitUpdates(cartItems, cartCount);
    } else {
      this.fetchCart().subscribe();
    }
  }

  public fetchCart() {
    const user = this.auth.userSubject.getValue();
    if (user) {
      return this.http
        .get('http://localhost:3000/api/cart/' + user.id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .pipe(
          tap((cart: Cart) => {
            const cartCount = this.getCartItemsCount(cart.products);
            this.emitUpdates(cart.products, cartCount);
          })
        );
    } else {
      return of();
    }
  }

  public setCartAfterLogin(cartItems: Product[]) {
    const cartCount = this.getCartItemsCount(cartItems);
    this.emitUpdates(cartItems, cartCount);
  }

  public saveCartToDb(items: Product[]) {
    this.saveCart(items).subscribe((res: any) => {
      this.emitUpdates(res.products, this.getCartItemsCount(res.products));
    });
  }

  private getPreviousValues() {
    return {
      items: this.cartItems.getValue(),
      count: this.cartItemsCount.getValue(),
    };
  }

  private checkIfLoggedInThenEmitUpdates(items: Product[], count: number) {
    const user = this.auth.userSubject.getValue();
    if (user) {
      this.saveCart(items).subscribe((res: any) => {
        this.emitUpdates(res.products, count);
      });
    } else {
      this.emitUpdates(items, count);
    }
  }

  private emitUpdates(updatedItems: Product[], updatedCount: number) {
    this.cartItemsCount.next(updatedCount);
    this.cartItems.next(updatedItems.slice());
    // Store the updated cart as JSON string in the local storage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  }

  private getCartItemsCount(items: Product[]) {
    const cartCount = items
      .map((item) => item.quantity)
      .reduce((q1, q2) => q1 + q2, 0);
    return cartCount;
  }

  private saveCart(cartItems: Product[]): Observable<Cart> {
    return this.auth.userSubject.pipe(
      take(1),
      exhaustMap((authResponse) => {
        return this.http.post<Cart>(
          'http://localhost:3000/api/cart',
          cartItems,
          {
            headers: {
              Authorization: `Bearer ${authResponse.token}`,
            },
          }
        );
      })
    );
  }
}
