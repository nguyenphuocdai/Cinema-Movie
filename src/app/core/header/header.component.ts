import { Component, OnInit, Input } from '@angular/core';
import { NgxZaloService } from '../../shared/services/ngx-zalo.service';
import { UserSocial } from '../../shared/models/user-social.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: Boolean = false;
  user: UserSocial;
  constructor(
    private _ngxZaloService: NgxZaloService,

  ) {

    this.isLogin = localStorage.getItem('isLogin') === 'true';
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
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
    window.location.reload();
  }
}
