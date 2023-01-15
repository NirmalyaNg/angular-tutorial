import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../models/product.model';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, propValue: string) {
    if (
      !value ||
      value.length === 0 ||
      !propValue ||
      propValue === 'ALL_PRODUCTS'
    ) {
      return value;
    }
    const filteredProducts = value.filter(
      (product: Product) => product.category === propValue
    );
    return filteredProducts;
  }
}