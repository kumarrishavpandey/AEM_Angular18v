import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DebugService } from 'src/app/shared/services/debug.service';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'customDateFormat',
})
export class CustomDatePipe implements PipeTransform {
  private datePipe: DatePipe;

  constructor(private commonService: CommonService, private debugService: DebugService) {
    this.datePipe = new DatePipe(this.commonService.getLocaleForDate());
  }

  transform(value: any): any {
    let inputDate: Date;

    // Attempt to parse the input as a date
    if (value instanceof Date) {
      inputDate = value;
    } else if (typeof value === 'string') {
      inputDate = new Date(
        this.datePipe.transform(value, 'yyyy-MM-ddTHH:mm:ssZ'),
      );
    }

    // Check if the parsed date is valid
    if (!inputDate || Number.isNaN(inputDate.getTime())) {
      this.debugService.error('Invalid date provided to customDate pipe:', value);
      return value;
    }

    try {
      // Use DatePipe to get the day, date, and month
      const formattedDate = this.datePipe.transform(
        inputDate,
        'EEE, dd MMMM yyyy',
      );

      return formattedDate;
    } catch (error) {
      this.debugService.error('Error formatting date:', error);
      return value;
    }
  }
}
