import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  inCart = false;
  subscriptions = new Subscription();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItems.subscribe((items) => {
        this.inCart = !!items.find((item) => item._id === this.product._id);
      })
    );
  }

  onAddToCart() {
    this.cartService.addToCart(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
