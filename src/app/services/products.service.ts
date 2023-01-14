import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/api/';
  public loadedProducts: Product[] = [];
  public loadedCategories: Category[] = [];
  constructor(private http: HttpClient, private auth: AuthService) {}

  public fetchProducts(): Promise<Product[]> {
    const products$ = this.http.get<Product[]>(this.baseUrl + 'products/').pipe(
      tap((products) => {
        this.loadedProducts = products;
      })
    );
    return lastValueFrom(products$);
  }

  public fetchCategories(): Promise<Category[]> {
    const categories$ = this.http
      .get<Category[]>(this.baseUrl + 'categories')
      .pipe(
        tap((categories) => {
          this.loadedCategories = categories;
        })
      );
    return lastValueFrom(categories$);
  }

  public fetchProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + productId);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products/', product, {
      headers: new HttpHeaders({
        Authorization: this.auth.userSubject.getValue().token,
      }),
    });
  }
}
