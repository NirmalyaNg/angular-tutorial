import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products/product.model';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  // @Input() id: string;
  // @Input() title: string;
  // @Input() description: string;
  // @Input() imageUrl: string;
  // @Input() price: string;
  @Input() product: Product;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  handleAddToCart() {
    this.cartService.addToCart(this.product.id);
  }
}
