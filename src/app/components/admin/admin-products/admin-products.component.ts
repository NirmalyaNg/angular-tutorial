import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory = 'electronics';
  constructor(private product: ProductsService) {}

  ngOnInit(): void {
    if (this.product.loadedProducts.length > 0) {
      this.products = this.product.loadedProducts;
      this.categories = this.product.loadedCategories.map((c) => c.name);
    } else {
      this.product
        .fetchProducts()
        .then((products) => {
          this.products = products;
          return this.product.fetchCategories();
        })
        .then(
          (categories) => (this.categories = categories.map((c) => c.name))
        );
    }
  }

  onCategoryChange(event: Event) {
    this.selectedCategory = (<HTMLInputElement>event.target).value;
  }
}
