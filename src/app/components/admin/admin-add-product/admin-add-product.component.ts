import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit {
  addProductForm: FormGroup;
  categories: string[] = [];
  constructor(
    private fb: FormBuilder,
    private product: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.product.loadedCategories.length > 0) {
      this.categories = this.product.loadedCategories.map((c) => c.name);
      this.initializeForm();
    } else {
      this.product.fetchCategories().then((categories) => {
        this.categories = categories.map((c) => c.name);
        this.initializeForm();
      });
    }
  }

  public isControlInvalidAndTouched(controlName: string) {
    const control = this.addProductForm.get(controlName);
    return control.invalid && control.touched;
  }

  public getControlErrors(controlName: string) {
    return this.addProductForm.get(controlName).errors;
  }

  public handleSubmit() {
    if (this.addProductForm.invalid) {
      return;
    }
    const product: Product = {
      title: this.addProductForm.value.title,
      description: this.addProductForm.value.description,
      category: this.addProductForm.value.category,
      image: this.addProductForm.value.image,
      price: this.addProductForm.value.price,
    };

    this.product.addProduct(product).subscribe({
      next: (product) => {
        this.product.loadedProducts.push(product);
        4;
        this.router.navigate(['products']);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  private initializeForm() {
    this.addProductForm = this.fb.group({
      title: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      description: this.fb.control('', {
        validators: [Validators.required],
      }),
      image: this.fb.control('', {
        validators: [Validators.required],
      }),
      category: this.fb.control('', {
        validators: [Validators.required],
      }),
      price: this.fb.control('', {
        validators: [Validators.required, Validators.min(0.01)],
      }),
    });
  }
}
