import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css'],
})
export class AdminAddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  error = null;
  constructor(
    private category: CategoryService,
    private product: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  public isControlInvalidAndTouched(controlName: string) {
    const control = this.addCategoryForm.get(controlName);
    return control.invalid && control.touched;
  }

  public getControlErrors(controlName: string) {
    return this.addCategoryForm.get(controlName).errors;
  }

  onSubmit() {
    if (this.addCategoryForm.invalid) {
      return;
    }
    this.category.addCategory(this.addCategoryForm.value.name).subscribe({
      next: (res: Category) => {
        this.product.loadedCategories.push(res);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
