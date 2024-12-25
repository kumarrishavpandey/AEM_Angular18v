import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizedHtml',
})
export class SanitizedHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value: any): any {
    if (value === null){
      return '';
    }
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
