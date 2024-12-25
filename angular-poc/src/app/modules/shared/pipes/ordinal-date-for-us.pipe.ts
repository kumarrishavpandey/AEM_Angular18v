import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalDateForUs',
})
export class OrdinalDateForUsPipe implements PipeTransform {
  transform(dateString: Date): string {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${month} ${this.getOrdinal(day)} ${year}`;
  }

  private getOrdinal(n: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
}