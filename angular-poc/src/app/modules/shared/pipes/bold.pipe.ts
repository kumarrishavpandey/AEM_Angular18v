import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold',
})
export class BoldPipe implements PipeTransform {
  transform(searchTerm: string, firstName: string, middleName: string, lastName: string, email:string): string {
    const outputString = '';

    if (searchTerm){
      const nameString = `${firstName} ${middleName} ${lastName} (${email})`.replace(/(^\s+|\s+$)/g, '');
      const regExp = new RegExp(searchTerm, 'gi');
      return nameString.replace(regExp, '<b>$&</b>');
    }

    return outputString;
  }
}
