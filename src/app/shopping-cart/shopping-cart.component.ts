import { Component, OnInit } from '@angular/core';
import { CartItem } from './cart-item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  myCartItems: CartItem[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.myCartItems = this.cartService.getCartItems();

    this.cartService.cartItemsChanged.subscribe((modifiedItems: CartItem[]) => {
      this.myCartItems = modifiedItems;
    });
  }
}
