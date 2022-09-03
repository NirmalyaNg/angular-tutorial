import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../shopping-cart/cart-item.model';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css'],
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() item: CartItem;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  handleRemoveFromCart() {
    this.cartService.deleteFromCart(this.item.id);
  }
}
