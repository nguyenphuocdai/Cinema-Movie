import { Component, OnInit } from '@angular/core';
import { NgxZaloService } from '../../../../shared/services/ngx-zalo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _ngxZaloService: NgxZaloService) {

  }
  login() {
    this._ngxZaloService.login();
  }
  checkLoginStatus() {
    console.log('Login status:', this._ngxZaloService.isLogin);
  }

  getMyProfile() {
    this._ngxZaloService.getMyProfile().subscribe(result => {
      console.log('My profile:', result);
    });
  }

  getAccessToken() {
    console.log(this._ngxZaloService.accessToken);
  }

  // noinspection JSMethodCanBeStatic
  logoutSuccessfullyAction() {
    console.log('Logout successfully');
  }

  ngOnInit() {
  }

}
