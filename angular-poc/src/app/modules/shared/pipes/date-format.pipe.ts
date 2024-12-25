import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  /* eslint-disable no-param-reassign */
  transform(value: string): unknown {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd-MMM-yyyy');
    return value;
  }
  /* eslint-enable no-param-reassign */
}
