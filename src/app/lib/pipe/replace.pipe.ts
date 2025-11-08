import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
   transform(value: string, oldValue: string, newValue: string): string {
        if (!value || !oldValue) {
          return value;
        }
        return value.replace(new RegExp(oldValue, 'g'), newValue);
      }

}
