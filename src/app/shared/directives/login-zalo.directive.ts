import { Directive, HostListener } from '@angular/core';
import { NgxZaloService } from '../services/ngx-zalo.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxLoginZalo]'
})
export class LoginZaloDirective {

  constructor(private _ngxZaloService: NgxZaloService) { }

  @HostListener('click') onClick() {
    this._ngxZaloService.login();
  }
}
