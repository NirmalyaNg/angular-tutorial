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

  public handleCategoryDelete(id: string) {
    const choice = confirm('Are you sure you want to delete this category ?');
    if (choice) {
      this.category.deleteCategory(id).subscribe({
        next: () => {
          const index = this.product.loadedCategories.findIndex(
            (c) => c._id === id
          );
          this.product.loadedCategories.splice(index, 1);
        },
      });
    }
  }
}
