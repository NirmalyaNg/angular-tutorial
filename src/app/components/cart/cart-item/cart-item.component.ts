import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../products/product/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item: Product;
  constructor(private cart: CartService) {}

  ngOnInit(): void {}

  onIncrement() {
    this.cart.increment(this.item.id);
  }

  onDecrement() {
    this.cart.decrement(this.item.id);
  }
}
