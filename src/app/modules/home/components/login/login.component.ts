import { Component, OnInit } from '@angular/core';
import { NgxZaloService } from '../../../../shared/services/ngx-zalo.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: Boolean = false;
  isRegister: Boolean = false;
  constructor(
    private _ngxZaloService: NgxZaloService,
    private _router: Router
  ) {
    if (this._router.url === '/login') {
      this.isLogin = true;
    } else {
      this.isRegister = true;
    }
    this.getMyProfile();
    localStorage.setItem('isLogin', this._ngxZaloService.isLogin.toString());
  }
  login() {
    this._ngxZaloService.login();
    this.checkLoginStatus();
  }
  checkLoginStatus() {
    console.log('Login status:', this._ngxZaloService.isLogin);
  }

  getMyProfile() {
    this._ngxZaloService.getMyProfile().subscribe(result => {
      localStorage.setItem('currentUser', JSON.stringify(result));
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
