import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, transition, query, group, style, animate } from '../../../../../../node_modules/@angular/animations';
import { UserService } from '../../../../shared/services/user.service';
import { CacheService } from '../../../../shared/services/cache.service';
import { FormGroup, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { Router } from '../../../../../../node_modules/@angular/router';
import { WOW } from 'wowjs/dist/wow.min';
import { SimpleCrypt } from 'ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../book-ticket/book-ticket.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]
    )
  ],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @Input() TotalTicket: String = '';
  @Input() TotalPrice: String = '';
  @Input() Ticket: Array<{ MaGhe: number, GiaVe: number }> = [];
  @Input() MaLichChieu: number;
  loginForm: FormGroup;
  usernameLogin: FormControl;
  passwordLogin: FormControl;
  DTOPutTicket: {
    MaLichChieu: number;
    TaiKhoanNguoiDung: string;
    DanhSachVe: { MaGhe: number, GiaVe: number }[]
  };
  hasError: Boolean = false;
  userLogin: any;
  showDialog: Boolean = false;
  isLogined: Boolean = false;
  isShowLoadingLogin: Boolean = false;
  isSubmitted: Boolean = false;
  currentUser: any;
  listUserGP07: any;
  passwordDecode: any;
  passwordNormal: string;
  constructor(
    private _userService: UserService,
    private _cacheService: CacheService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.CreateValidatorLoginForm();
    this.CreateLoginForm();
    // tslint:disable-next-line:prefer-const

  }


  putTicket() {
    this.currentUser = this._cacheService.get('CurrentUser');
    if (this.currentUser) {
      this.isLogined = true;
      this.showDialog = false;
    } else {
      this.isLogined = false;
      this.showDialog = true;
    }
    if (this.currentUser && this.showDialog === false) {
      this.isSubmitted = true;
      this.DTOPutTicket = {
        MaLichChieu: this.MaLichChieu,
        TaiKhoanNguoiDung: this.currentUser.TaiKhoan.toString(),
        DanhSachVe: this.Ticket
      };
      console.log(this.DTOPutTicket);
      this._userService.putTicket(this.DTOPutTicket)
        .subscribe((result) => {
          if (result) {
            setTimeout(
              () => {
                this._router.navigate(['home-page/success']);
                this.isSubmitted = false;
              }
              , 3000);
          }

        });
    }

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
            this.showDialog = false;
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
  ngAfterViewInit() {
    new WOW().init();
    this.getAllUserGP07();
  }
}
