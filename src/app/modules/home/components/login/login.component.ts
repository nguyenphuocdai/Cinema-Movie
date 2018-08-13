import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxZaloService } from '../../../../shared/services/ngx-zalo.service';
import { Router } from '@angular/router';
import { CacheService } from '../../../../shared/ng2-cache-service';
import { MovieService } from '../../../../shared/services/movie.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PasswordValidation } from '../../../../shared/directives/macth-password.validate';
import { SimpleCrypt } from 'ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';
import { UserNormal } from '../../../../shared/models/user-normal.model';
import { UserService } from '../../../../shared/services/user.service';
import * as base32 from 'hi-base32';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: Boolean = true;
  isRegister: Boolean = false;
  isAllowLogin: Boolean = false;
  isSuccessfully: Boolean = false;
  isShowLoadingLogin: Boolean = false;
  registeredName: String = '';
  userLoginNow: any;
  regexPassword = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,32}$';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  private loginForm: FormGroup;
  private usernameLogin: FormControl;
  private passwordLogin: FormControl;

  private registerForm: FormGroup;
  private account: FormControl;
  private password: FormControl;
  private passwordConFirm: FormControl;
  private username: FormControl;
  private email: FormControl;
  private phoneNumber: FormControl;
  private formIsSubmitting: boolean;
  private registerInfo: UserNormal = new UserNormal();

  constructor(
    private _ngxZaloService: NgxZaloService,
    private _router: Router,
    private _cacheService: CacheService,
    private _movieService: MovieService,
    private _userService: UserService,
    private _location: Location
  ) {
    // const simpleCrypt = new SimpleCrypt();
    // const encodedString = simpleCrypt.encode(LocalKey.keyCryto, 'Su-Su');
    // console.log(encodedString);
    // const decodedString = simpleCrypt.decode(LocalKey.keyCryto, encodedString);
    // console.log(decodedString);
    // console.log(base32.encode('vicente001'));
    // console.log(base32.decode('OZUWGZLOORSTAMBR'));

    // this.isAllowLogin = this._movieService.BooleanConverter(localStorage.getItem('isLogin'));
    // if (this.isAllowLogin === true) {
    //   this._location.back();
    // }

  }
  login() {
    this._ngxZaloService.login();
    this.getMyProfile();
    localStorage.setItem('isLogin', this._ngxZaloService.isLogin.toString());
  }
  loginNormal() {
    this.isShowLoadingLogin = true;
    this._userService.loginUser(this.usernameLogin.value, this.passwordLogin.value)
      .subscribe(
        (result) => {
          this._userService.displayNameUser(result.HoTen);
          this._router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
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
    this.CreateValidatorRegisterForm();
    this.CreateRegisterForm();

    this.CreateValidatorLoginForm();
    this.CreateLoginForm();
  }
  private CreateLoginForm() {
    this.loginForm = new FormGroup({
      usernameLogin: this.usernameLogin,
      passwordLogin: this.passwordLogin
    });
  }
  private CreateValidatorLoginForm() {
    this.usernameLogin = new FormControl('', [Validators.required]);
    this.passwordLogin = new FormControl('', [Validators.required]);
  }
  private CreateRegisterForm() {
    this.registerForm = new FormGroup({
      account: this.account,
      password: this.password,
      passwordConFirm: this.passwordConFirm,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber
    }, {
        validators: PasswordValidation.MatchPassword
      });
  }

  private CreateValidatorRegisterForm() {
    this.account = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_-]{8,15}$/)]);
    this.password = new FormControl('', [Validators.required, Validators.pattern(this.regexPassword)]);
    this.passwordConFirm = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(/[^\s@]+@[^\s@]+\.[^\s@]+$/)]);
    this.phoneNumber = new FormControl('', [Validators.required, Validators.pattern(/^(01[2689]|09|08)[0-9]{8}$/)]);

    this.registerForm = new FormGroup({
      account: this.account,
      password: this.password,
      passwordConFirm: this.passwordConFirm,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }

  registerUser() {
    const simpleCrypt = new SimpleCrypt();

    this.formIsSubmitting = true;
    this.registerInfo.TaiKhoan = this.account.value;
    this.registerInfo.MatKhau = simpleCrypt.encode(LocalKey.keyCryto, this.password.value);
    this.registerInfo.HoTen = this.username.value;
    this.registerInfo.Email = this.email.value;
    this.registerInfo.SoDT = this.phoneNumber.value;
    this.registerInfo.MaNhom = 'GP07';
    this.registerInfo.MaLoaiNguoiDung = 'KhachHang';
    this.registerInfo.TenLoaiNguoiDung = 'Khách hàng';
    this.registerInfo.SSID = '';
    this.registerInfo.SecretKey = this._userService.makeid();

    this._userService.registerUser(this.registerInfo)
      .subscribe(
        (result) => {
          this.userLoginNow = result;
          console.log(this.userLoginNow);
          this.isSuccessfully = true;
          this.registeredName = result.HoTen;
          this.isSuccessfully = true;
          this.formIsSubmitting = false;
          this.resetForm(this.registerForm);
        }
      );

  }
  loginNow() {

  }
  resetForm(form: FormGroup) {
    return form.reset();
  }
  // function makeid() {
  //   var text = "";
  //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  //   for (var i = 0; i < 32; i++)
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));

  //   return text;
  // }
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
