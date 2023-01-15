import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private product: ProductsService,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    if (this.product.loadedCategories.length > 0) {
      this.categories = this.product.loadedCategories;
    } else {
      this.product.fetchCategories().then((categories) => {
        this.categories = categories;
      });
    }
  }

  public handleCategoryDelete(category: Category) {
    const choice = confirm('Are you sure you want to delete this category ?');
    if (choice) {
      this.category.deleteCategory(category._id).subscribe({
        next: () => {
          const index = this.product.loadedCategories.findIndex(
            (c) => c._id === category._id
          );
          this.product.loadedCategories.splice(index, 1);
          this.product.loadedProducts = this.product.loadedProducts.filter(
            (p) => p.category !== category.name
          );
        },
      });
    }
  }
}
