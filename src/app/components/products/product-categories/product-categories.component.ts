import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  @Input() categories: string[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCategoryChange(category: string) {
    this.router.navigate(['/products', category]);
  }
}
