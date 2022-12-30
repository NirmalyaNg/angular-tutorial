import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  @Input() categories: string[] = [];
  @Output() onCategorySelect = new EventEmitter<string>();
  selectedCategory = 'ALL_PRODUCTS';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.onCategorySelect.emit(this.selectedCategory);
  }
}
