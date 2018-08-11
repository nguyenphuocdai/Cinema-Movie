import { Component, OnInit, Input } from '@angular/core';
import { NgxZaloService } from '../../shared/services/ngx-zalo.service';
import { UserSocial } from '../../shared/models/user-social.model';
import { UserNormal } from '../../shared/models/user-normal.model';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogined: Boolean = false;
  isLogin: Boolean = false;
  user: UserSocial;
  userNormal: UserNormal;
  displayName: String = '';
  constructor(
    private _ngxZaloService: NgxZaloService,
    private _router: Router,

  ) {
    if (localStorage.getItem('TypeLogin') === 'normal') {
      this.userNormal = JSON.parse(localStorage.getItem('currentUserNormal'));
      if (this.userNormal !== null) {
        this.displayName = this.userNormal.HoTen;
        this.isLogined = true;
        return;
      }
    }
    if (localStorage.getItem('isLogin') === 'true') {
      this.isLogin = localStorage.getItem('isLogin') === 'true';
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      if (this.user.error === 0 && !this.isLogin) {
        this._router.navigate(['/login']);
        this.removeCache();
        return;
      }
      this.displayName = this.user.name;
      this.isLogined = true;
      return;
    }

  }

  ngOnInit() {

  }
  logout() {
    this._ngxZaloService.logout().subscribe();
    localStorage.setItem('isLogin', 'false');
    localStorage.removeItem('currentUser');
    console.log(this._ngxZaloService.logout().subscribe());
  }
  checkLoginStatus() {
    console.log('Login status:', this._ngxZaloService.isLogin);
  }
  logoutSuccessfullyAction() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('TypeLogin');
    localStorage.removeItem('currentUserNormal');
    window.location.reload();
  }
  removeCache() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('currentUser');
  }
}
