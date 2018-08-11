import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(val: any, args?: any): any {
    val = val.charAt(0) !== 0 ? '0' + val : '' + val;
    let newStr = '';

    // tslint:disable-next-line:no-var-keyword
    for (var i = 0; i < (Math.floor(val.length / 2) - 1); i++) {
      newStr = newStr + val.substr(i * 2, 2) + '-';
    }
    return newStr + val.substr(i * 2);
  }

}
