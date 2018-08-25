import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxZaloService } from '../../../../shared/services/ngx-zalo.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-zalo-callback',
  templateUrl: './zalo-callback.component.html',
  styleUrls: ['./zalo-callback.component.scss']
})
export class ZaloCallbackComponent {

  constructor(private _router: Router, private _ngxZaloService: NgxZaloService) {
    this._ngxZaloService.updateLoginInfo().subscribe((res) => {
      if (res === true) {
        this._ngxZaloService.getMyProfile().subscribe((result) => {
        });
        this._router.navigate(['/home-page']);
      } else {
        this._router.navigate(['/home-page/login']);
      }
    });
  }
}
