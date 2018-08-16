import { Component, OnInit, Input } from '@angular/core';
import { NgxZaloService } from '../../shared/services/ngx-zalo.service';
import { UserSocial } from '../../shared/models/user-social.model';
import { UserNormal } from '../../shared/models/user-normal.model';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CacheService } from '../../shared/services/cache.service';


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
  currentUSer: any;
  constructor(
    private _ngxZaloService: NgxZaloService,
    private _router: Router,
    private _userService: UserService,
    private _cacheService: CacheService,
  ) {
    _ngxZaloService.getLoggedInName.subscribe(user => this.changeName(user));
    _userService.getLoggedInName.subscribe(user => this.changeName(user));
  }

  ngOnInit() {
    this.currentUSer = this._cacheService.get('CurrentUser');
    if (this.currentUSer) {
      this.changeName(this.currentUSer.HoTen);
      return;
    }
  }
  checkLoginStatus() {
    console.log('Login status:', this._ngxZaloService.isLogin);
  }
  logoutSuccessfullyAction() {
    this._cacheService.removeAll();
    this.changeName(null);
  }
  removeCache() {
    this._cacheService.removeAll();
  }
  private changeName(user: any): void {
    // tslint:disable-next-line:prefer-const
    let data: any | null = this._cacheService.get('CurrentUser');
    if (user === null) {
      this.isLogined = false;
      return;
    }
    this.isLogined = true;
    if (typeof user === 'object') {
      this.displayName = user.name;
    } else {
      this.displayName = user;
    }

  }
}
