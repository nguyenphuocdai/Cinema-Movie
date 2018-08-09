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
    this._ngxZaloService.getMyProfile().subscribe(result => {
      localStorage.setItem('isLogin', this._ngxZaloService.isLogin.toString());
      localStorage.setItem('currentUser', JSON.stringify(result));
    });
    this._ngxZaloService.updateLoginInfo().subscribe(() => {
      location.reload();
      this._router.navigate(['/home']);
    });
  }
}
