import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onAddToCart() {
    this.cartService.addToCart(this.product);
  }
}
