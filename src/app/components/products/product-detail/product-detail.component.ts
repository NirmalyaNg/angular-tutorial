import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = null;
  constructor(private route: ActivatedRoute, private cart: CartService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data.product;
    });
  }

  onAddToCart() {
    this.cart.addToCart(this.product);
  }
}
