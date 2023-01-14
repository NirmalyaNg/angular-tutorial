import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public categories: string[] = [];
  public isFetching = false;
  public error: string = null;
  public selectedCategory: string = null;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    if (
      this.productsService.loadedProducts.length > 0 &&
      this.productsService.loadedCategories.length > 0
    ) {
      this.products = this.productsService.loadedProducts;
      this.categories = this.productsService.loadedCategories.map(
        (c) => c.name
      );
      return;
    }
    this.isFetching = true;
    this.productsService
      .fetchProducts()
      .then((products) => {
        this.products = products;
        return this.productsService.fetchCategories();
      })
      .then((categories) => {
        this.categories = categories.map((c) => c.name);
        this.isFetching = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.isFetching = false;
      });
  }

  handleCategoryChange(category: string) {
    this.selectedCategory = category;
  }
}
