import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/api/';
  public loadedProducts: Product[] = [];
  public loadedCategories: string[] = [];
  constructor(private http: HttpClient) {}

  public fetchProducts(): Promise<Product[]> {
    const products$ = this.http.get<Product[]>(this.baseUrl + 'products/').pipe(
      tap((products) => {
        this.loadedProducts = products;
      })
    );
    return lastValueFrom(products$);
  }

  public fetchCategories(): Promise<string[]> {
    const categories$ = this.http
      .get<Category[]>(this.baseUrl + 'categories')
      .pipe(
        map((categories) => {
          return categories.map((category) => category.name);
        }),
        tap((categories) => {
          this.loadedCategories = categories;
        })
      );
    return lastValueFrom(categories$);
  }

  public fetchProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + productId);
  }
}
