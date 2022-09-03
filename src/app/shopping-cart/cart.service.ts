import { Injectable, EventEmitter } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { CartItem } from './cart-item.model';

@Injectable()
export class CartService {
  public cartItemsChanged = new EventEmitter<CartItem[]>();
  constructor(private productsService: ProductsService) {}

  private _cartItems: CartItem[] = [];

  public getCartItems(): CartItem[] {
    return this._cartItems.slice();
  }

  public addToCart(id: string) {
    const itemToAdd = this._cartItems.find((cartItem: CartItem) => {
      return cartItem.id === id;
    });
    if (itemToAdd) {
      // If item was already present in the cart
      itemToAdd.quantity++;
    } else {
      // If item was not present in the cart
      const product = this.productsService.getProduct(id);
      this._cartItems.push({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    this.cartItemsChanged.emit(this._cartItems.slice());
  }

  public getTotalCartPrice() {
    let totalPrice = 0;
    this._cartItems.forEach((cartItem: CartItem) => {
      totalPrice += cartItem.quantity * +cartItem.price;
    });
    return totalPrice;
  }

  public deleteFromCart(id: string) {
    this._cartItems = this._cartItems.filter((cartItem: CartItem) => {
      return cartItem.id !== id;
    });
    this.cartItemsChanged.emit(this._cartItems.slice());
  }
}
