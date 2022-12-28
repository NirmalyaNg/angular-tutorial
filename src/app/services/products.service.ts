import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../components/products/product/product.model';
import { Observable, lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://fakestoreapi.com/products';
  public loadedProducts: Product[] = [];
  public loadedCategories: string[] = [];
  constructor(private http: HttpClient) {}

  public fetchProducts(): Promise<Product[]> {
    const products$ = this.http.get<Product[]>(this.baseUrl).pipe(
      tap((products) => {
        this.loadedProducts = products;
      })
    );
    return lastValueFrom(products$);
  }

  public fetchCategories(): Promise<string[]> {
    const categories$ = this.http
      .get<string[]>(this.baseUrl + '/categories')
      .pipe(
        tap((categories) => {
          this.loadedCategories = categories;
        })
      );
    return lastValueFrom(categories$);
  }

  public getProductsByCategory(category: string): Promise<Product[]> {
    const products$ = this.http.get<Product[]>(
      this.baseUrl + '/categories/' + category
    );
    return lastValueFrom(products$);
  }
}
