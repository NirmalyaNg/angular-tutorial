import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter2',
})
export class CustomFilterPipe2 implements PipeTransform {
  transform(value: any, arg: any) {
    const modifiedValue = [];
    for (let item of value) {
      if (item.toLowerCase().startsWith(arg)) {
        modifiedValue.push(item);
      }
    }
    return modifiedValue;
  }
}
