import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateWithoutYear' })
export class DateWithoutYearPipe implements PipeTransform {
  transform(date: string, format: string = 'DD MMM'): string {
    if (!date) {
      return '';
    }

    let dateObj: Date;

    // Handle different date formats
    if (date.includes('T')) {
      // ISO date format
      dateObj = new Date(date);
    } else {
      // MM-DD format
      const dateParts = date.split('-');
      if (dateParts.length !== 2) {
        return '';
      }

      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);

      if (day < 1 || day > 31 || month < 1 || month > 12) {
        return '';
      }

      // Use a dummy year to create the Date object
      dateObj = new Date(2000, month - 1, day);
    }

    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(dateObj, 'MMM dd');

    if (!formattedDate) {
      return '';
    }

    const parts = formattedDate.split(' ');
    const monthName = parts[0];
    const dayNumber = parseInt(parts[1], 10);

    const dayWithOrdinal = `${dayNumber}${this.getOrdinal(dayNumber)}`;

    if (format === 'DD MMM') {
      return `${dayWithOrdinal} ${monthName}`;
    }
    if (format === 'MMM DD') {
      return `${monthName} ${dayWithOrdinal}`;
    }

    return formattedDate;
  }

  private getOrdinal(n: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  }
}
