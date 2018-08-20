import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { PasswordValidation } from '../../../../shared/directives/macth-password.validate';
import { CacheService } from '../../../../shared/services/cache.service';
import { UserNormal } from '../../../../shared/models/user-normal.model';
import { LocalKey } from '../../../../app.config';
import { SimpleCrypt } from '../../../../../../node_modules/ngx-simple-crypt';
import { UserService } from '../../../../shared/services/user.service';
import { ScriptService } from '../../../../../../node_modules/ngx-script-loader';
import { Router } from '../../../../../../node_modules/@angular/router';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  oldPasswordServer: string;
  isSuccessfully: Boolean = false;
  currentUser: any;
  updateNameUser: String = '';
  oldPasswordError: Boolean = false;
  isShowOtpverify: Boolean = false;
  otpVerifyNumber: String = '';
  hasErrorPasswordNew: Boolean = false;
  otpError: Boolean;
  private updateForm: FormGroup;
  private account: FormControl;
  private oldPassword: FormControl;
  private password: FormControl;
  private passwordConFirm: FormControl;
  private username: FormControl;
  private email: FormControl;
  private phoneNumber: FormControl;
  private otpNumber: FormControl;
  private agree: FormControl;
  private formIsSubmitting: Boolean;

  private updateInfoUser: UserNormal = new UserNormal();

  @ViewChild('secret') myInput: ElementRef;
  @ViewChild('otp') otp: ElementRef;

  regexPassword = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*?]{6,}$';
  constructor(
    private _cacheService: CacheService,
    private _userService: UserService,
    private _el: ElementRef,
    private scriptService: ScriptService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.scriptService.loadScript('../../../../../assets/js/sha.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script sha js');
    });
    this.currentUser = this._cacheService.get('CurrentUser');
    this.CreateValidatorUpdateForm();
    this.CreateUpdateForm();


  }
  private CreateUpdateForm() {
    this.updateForm = new FormGroup({
      account: this.account,
      otpNumber: this.otpNumber,
      oldPassword: this.oldPassword,
      password: this.password,
      passwordConFirm: this.passwordConFirm,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber
    }, {
        validators: PasswordValidation.MatchPassword
      });
  }

  private CreateValidatorUpdateForm() {
    // tslint:disable-next-line:max-line-length
    this.account = new FormControl({ value: this.currentUser.TaiKhoan, disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9_-]{8,15}$/)]);
    this.oldPassword = new FormControl('', [Validators.required]);
    this.otpNumber = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.pattern(this.regexPassword)]);
    this.passwordConFirm = new FormControl('', [Validators.required]);
    this.username = new FormControl(this.currentUser.HoTen, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]);
    this.email = new FormControl(this.currentUser.Email, [Validators.required, Validators.pattern(/[^\s@]+@[^\s@]+\.[^\s@]+$/)]);
    this.phoneNumber = new FormControl(this.currentUser.SoDT, [Validators.required, Validators.pattern(/^(01[2689]|09|08)[0-9]{8}$/)]);
  }
  updateUser() {
    this.formIsSubmitting = true;
    const simpleCrypt = new SimpleCrypt();
    if (this.currentUser.SSID) {
      this.oldPasswordServer = simpleCrypt.decode(LocalKey.keyCryto, this.currentUser.SSID);
    }
    if (this.oldPasswordServer) {
      if (this.oldPasswordServer !== this.oldPassword.value && !this.isShowOtpverify) {
        this.oldPasswordError = true;
        this.formIsSubmitting = false;
        return;
      }
    }

    if (this.isShowOtpverify) {
      // tslint:disable-next-line:no-unused-expression
      if (this.otp.nativeElement.innerHTML === this.otpNumber.value) {
        this.otpError = true;
        return;
      } else {
        this.otpError = false;
      }
    }
    if (!this.password.value || !this.passwordConFirm.value) {
      this.hasErrorPasswordNew = true;
      return;
    }
    this.updateInfoUser.TaiKhoan = this.account.value;
    this.updateInfoUser.MatKhau = simpleCrypt.encode(LocalKey.keyCryto, this.password.value).replace(/[^a-zA-Z0-9]/g, '_');
    this.updateInfoUser.SoDT = this.phoneNumber.value;
    this.updateInfoUser.MaNhom = 'GP07';
    this.updateInfoUser.Email = this.email.value;
    this.updateInfoUser.MaLoaiNguoiDung = 'KhachHang';
    this.updateInfoUser.HoTen = this.username.value;
    this.updateInfoUser.SSID = simpleCrypt.encode(LocalKey.keyCryto, this.password.value);
    this.updateInfoUser.SecretKey = this._userService.makeid();

    this._userService.updateUser(this.updateInfoUser)
      .subscribe(
        (result) => {
          setTimeout(() => {
            this.isSuccessfully = true;
            this.updateNameUser = result.HoTen;
            this._cacheService.remove('CurrentUser');
            this._userService.displayNameUser(null);
          }, 2000);
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 5000);
        },
        (err) => {
          this.formIsSubmitting = false;
        }
      );
  }
  useOtpVerify() {

    this.isShowOtpverify = !this.isShowOtpverify;
    if (this.isShowOtpverify) {
      this.otpNumber = new FormControl('', [Validators.required]);
      this.oldPassword = new FormControl('');
      setTimeout(() => {
        console.log(this.otp.nativeElement);
        console.log(this.otp.nativeElement.innerHTML);
      }, 1000);

    } else {
      this.oldPassword = new FormControl('', [Validators.required]);
      this.otpNumber = new FormControl('');
    }
  }
  ngAfterViewInit() {
    this.scriptService.loadScript('../../../../../assets/js/authenticator.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script authenticator js');
    });
    if (this.currentUser.SecretKey) {
      this.myInput.nativeElement.value = this.currentUser.SecretKey;
    }
    new WOW().init();
  }
}
