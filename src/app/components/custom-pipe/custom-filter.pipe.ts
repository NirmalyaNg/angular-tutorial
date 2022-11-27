import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
})
export class CustomFilterPipe implements PipeTransform {
  transform(value: any, arg: any) {
    const modifiedValue = [];
    for (let item of value) {
      if (item.length <= 5) {
        modifiedValue.push(item);
      }
    }
    return modifiedValue;
  }
}
