import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../components/products/product/product.model';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, propValue: string) {
    if (!value || value.length === 0 || !propValue) {
      return value;
    }
    const filteredProducts = value.filter(
      (product: Product) => product.category === propValue
    );
    return filteredProducts;
  }
}
