import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDateFormat',
})
export class UtcDateFormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: any): string {
    if (!value) return '';

    const date = new Date(value);
    const formattedDate = this.datePipe.transform(
      date,
      'dd MMM yyyy, HH:mm (UTC)',
    );
    return formattedDate;
  }
}
