import { Component, OnInit } from '@angular/core';
import { NgxZaloService } from '../../../../shared/services/ngx-zalo.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CacheService } from '../../../../shared/ng2-cache-service';
import { MovieService } from '../../../../shared/services/movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: Boolean = true;
  isRegister: Boolean = false;
  isAllowLogin: Boolean = false;
  constructor(
    private _ngxZaloService: NgxZaloService,
    private _router: Router,
    private _cacheService: CacheService,
    private _movieService: MovieService,
    private _location: Location
  ) {

    this.isAllowLogin = this._movieService.BooleanConverter(localStorage.getItem('isLogin'));
    if (this.isAllowLogin === true) {
      this._location.back();
    }

  }

  login() {
    this._ngxZaloService.login();
    this.getMyProfile();
    localStorage.setItem('isLogin', this._ngxZaloService.isLogin.toString());
  }

  checkLoginStatus() {
    console.log('Login status:', this._ngxZaloService.isLogin);
  }

  getMyProfile() {
    this._ngxZaloService.getMyProfile().subscribe(result => {
      localStorage.setItem('currentUser', JSON.stringify(result));
    });
  }

  // getAccessToken() {
  //   console.log(this._ngxZaloService.accessToken);
  // }

  // // noinspection JSMethodCanBeStatic
  // logoutSuccessfullyAction() {
  //   console.log('Logout successfully');
  // }
  register() {
    this.isLogin = true;
    if (this.isLogin) {
      this.isLogin = false;
      this.isRegister = !this.isLogin;
    }
  }
  ngOnInit() {
  }
  // public func() {

  //   //set global prefix as build version
  //   this._cacheService.setGlobalPrefix(BUILD_VERSION);

  //   //put some data to cache "forever"
  //   //returns true is data was cached successfully, otherwise - false
  //   let result: boolean = this._cacheService.set('key', ['some data']);

  //   //put some data to cache for 5 minutes (maxAge - in seconds)
  //   this._cacheService.set('key', ['some data'], { maxAge: 5 * 60 });

  //   //put some data to cache for 1 hour (expires - timestamp with milliseconds)
  //   this._cacheService.set('key', { 'some': 'data' }, { expires: Date.now() + 1000 * 60 * 60 });

  //   //put some data to cache with tag "tag"
  //   this._cacheService.set('key', 'some data', { tag: 'tag' });

  //   //get some data by key, null - if there is no data or data has expired
  //   let data: any | null = this._cacheService.get('key');

  //   //check if data exists in cache
  //   let exists: boolean = this._cacheService.exists('key');

  //   //remove all data from cache with tag "tag"
  //   this._cacheService.removeTag('tag');

  //   //remove all from cache
  //   this._cacheService.removeAll();

  //   //get all data related to tag "tag" :
  //   // {'key' => 'key data', ...}
  //   this._cacheService.getTagData('tag');

  // }
}
