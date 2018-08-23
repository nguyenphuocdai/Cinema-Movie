import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { AuthGuardService } from '../../../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WOW } from 'wowjs/dist/wow.min';
import { SimpleCrypt } from 'ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { CacheService } from '../../../../shared/services/cache.service';

declare var $: any;
@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.scss']
})
export class LoginDashboardComponent implements OnInit, AfterViewInit {
  isShowLoadingLogin: Boolean = false;
  private loginForm: FormGroup;
  private usernameLogin: FormControl;
  private passwordLogin: FormControl;
  passwordDecode: any;
  listUserGP07: any;
  userLogin: any;
  hasError: Boolean = false;
  passwordNormal: string;
  constructor(
    private scriptService: ScriptService,
    private _authGuardService: AuthGuardService,
    private _userService: UserService,
    private _router: Router,
    private _cacheService: CacheService
  ) {
    // tslint:disable-next-line:prefer-const
    let headerFlagSubj = this._authGuardService.getHeaderFlag();
    headerFlagSubj.next(false);
  }

  ngOnInit() {
    // this.scriptService.loadScript('../../../../../assets/js/lightning-engraving.js').subscribe(() => {
    // }, (error) => {
    //   console.log('Failed to load script main js');
    // });
    this.CreateValidatorLoginForm();
    this.CreateLoginForm();
  }
  ngAfterViewInit() {
    $('input[type="password"]').on('focus', function () {
      $('*').addClass('password');
    }).on('focusout', function () {
      $('*').removeClass('password');
    });
    new WOW().init();
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
  getAllUserGP07() {
    this._userService.getUserGP07().subscribe((result) => { this.listUserGP07 = result; console.log(this.listUserGP07); });
  }
  loginNormal() {
    const simpleCrypt = new SimpleCrypt();
    this.userLogin = this.listUserGP07.find(e => e.TaiKhoan === this.usernameLogin.value);
    this.isShowLoadingLogin = true;
    if (this.userLogin) {
      if (this.userLogin.SSID) {
        this.passwordDecode = simpleCrypt.decode(LocalKey.keyCryto, this.userLogin.SSID);
      }
      if (this.passwordDecode) {
        this.passwordNormal = this.userLogin.MatKhau;
      } else {
        if (this.passwordLogin.value === this.userLogin.MatKhau) {
          this.passwordNormal = this.passwordLogin.value;
        } else {
          this.hasError = true;
          this.isShowLoadingLogin = false;
          return;
        }
      }
      this._userService.loginUser(this.usernameLogin.value, this.passwordNormal)
        .subscribe(
          (result) => {
            this._userService.displayNameUser(result.HoTen);
            this._userService.saveSecretKey(result.SecretKey);
            this._cacheService.set('CurrentUser', result);
            this._router.navigate(['/home']);
          },
          (error) => {
            this.hasError = true;
            this.isShowLoadingLogin = false;
          }
        );
    } else {
      this.hasError = true;
      this.isShowLoadingLogin = false;
    }
  }
}
