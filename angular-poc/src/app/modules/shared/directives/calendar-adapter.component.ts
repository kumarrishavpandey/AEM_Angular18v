import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class DateFormatAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const locale = this.locale.toLowerCase();
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (locale === 'en-us') {
        return `${month}/${day}/${year}`;
      } if (locale === 'en-in') {
        return `${day}/${month}/${year}`;
      }
      // Default to US format
      return `${month}/${day}/${year}`;
    }
    return date.toDateString();
  }
}
