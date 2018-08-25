import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, transition, query, group, style, animate } from '../../../../../../node_modules/@angular/animations';
import { UserService } from '../../../../shared/services/user.service';
import { CacheService } from '../../../../shared/services/cache.service';
import { FormGroup, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { Router } from '../../../../../../node_modules/@angular/router';
import { WOW } from 'wowjs/dist/wow.min';

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
  showDialog: Boolean = false;
  isLogined: Boolean = false;
  isShowLoadingLogin: Boolean = false;
  isSubmitted: Boolean = false;
  currentUser: any;

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
                this._router.navigate(['/success']);
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

  loginNormal() {

    this.isShowLoadingLogin = true;
    this._userService.loginUser(this.usernameLogin.value, this.passwordLogin.value)
      .subscribe(
        (result) => {
          this._userService.displayNameUser(result.HoTen);
          this._cacheService.set('CurrentUser', result);
          this.showDialog = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  ngAfterViewInit() {
    new WOW().init();
  }
}
