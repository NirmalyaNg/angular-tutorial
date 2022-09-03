import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { products } from './products';

@Injectable()
export class ProductsService {
  private _listOfProducts: Product[] = products;

  constructor() {}

  public getProducts(): Product[] {
    return this._listOfProducts.slice();
  }

  public getProduct(id: string): Product {
    const product = this._listOfProducts.find((p) => {
      return p.id === id;
    });
    return product;
  }
}
