import { Component, OnInit, Input, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { NgxZaloService } from '../../shared/services/ngx-zalo.service';
import { UserSocial } from '../../shared/models/user-social.model';
import { UserNormal } from '../../shared/models/user-normal.model';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CacheService } from '../../shared/services/cache.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderComponent implements OnInit {

  isLogined: Boolean = false;
  isLogin: Boolean = false;
  status: boolean = false;
  fixed: boolean = false;
  user: UserSocial;
  userNormal: UserNormal;
  displayName: String = '';
  currentUSer: any;
  isShowSlidebar: Boolean = true;
  constructor(
    private _ngxZaloService: NgxZaloService,
    private _router: Router,
    private _userService: UserService,
    private _cacheService: CacheService,
    private _eref: ElementRef
  ) {
    _ngxZaloService.getLoggedInName.subscribe(user => { this.changeName(user); console.log(user); });
    _userService.getLoggedInName.subscribe(user => this.changeName(user));


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if (event.target.innerWidth > 991) {
      this.isShowSlidebar = true;
    }
    else {
      this.isShowSlidebar = false;
    }
    if (event.target.innerWidth > 576) {
      $('html').removeClass('nav_open');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const number = $event.target.scrollTop;
    if (number > 40) {
      this.fixed = true;
    } else if (this.fixed && number < 10) {
      this.fixed = false;
    }
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
  show() {
    this.status == true ? this.status = false : this.status = true;
  }
  hide() {
    this.status == false ? this.status = true : this.status = false;
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
      $('html').removeClass('nav_open');
    // $('#toggle-button').click();
  }
}