import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../../shared/services/movie.service';
import { CarouselComponent } from '../../components/carousel-movie/carousel.component';
import { WOW } from 'wowjs/dist/wow.min';
import { UserService } from '../../../../shared/services/user.service';
import { CacheService } from '../../../../shared/services/cache.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SimpleCrypt } from 'ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  id: number;
  parentRouteId: number;
  currentMovie: any;
  showDialogTicket: Boolean = false;
  detailMovieSelected: any;
  showDialogSits: Boolean = false;
  MaLichChieu: any;
  selectedCombo: any;
  selectedCount: number = 0;
  totalCount = 0;
  count = 0;
  selectedSit: any;
  selectedArray: Array<String> = [];
  TotalTicket: Array<{ MaGhe: any, GiaVe: any }> = [];

  loginForm: FormGroup;
  usernameLogin: FormControl;
  passwordLogin: FormControl;

  DTOPutTicket: {
    MaLichChieu: number;
    TaiKhoanNguoiDung: string;
    DanhSachVe: { MaGhe: number, GiaVe: number }[]
  };
  isSubmitted: Boolean = false;
  Sits: any;
  SitAtPositionE: any;
  SitAtPositionF: any;
  SitAtPositionG: any;
  SitAtPositionI: any;
  currentUser: any;
  showDialogLogin: Boolean = false;
  isLogined: Boolean = false;
  sub: any;

  hasError: Boolean = false;
  userLogin: any;
  showDialog: Boolean = false;
  isShowLoadingLogin: Boolean = false;
  listUserGP07: any;
  passwordDecode: any;
  passwordNormal: string;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _movieService: MovieService,
    private elem: ElementRef,
    private _userService: UserService,
    private _cacheService: CacheService,
  ) {
    window.scrollTo(0, 0);
   }
  toggle() {
    this.topCarousel.toggleMode();
  }
  combo = [
    { id: 1, url: '../../../../../assets/img/combo/cb1.png', name: 'The Predator Combo' },
    { id: 2, url: '../../../../../assets/img/combo/cb2.png', name: 'Pineapple Combo' },
    { id: 3, url: '../../../../../assets/img/combo/cb3.png', name: 'CGV Combo' },
    { id: 4, url: '../../../../../assets/img/combo/cb4.png', name: 'My Combo' },
    { id: 5, url: '../../../../../assets/img/combo/cb5.png', name: 'Hotdog' },
    { id: 6, url: '../../../../../assets/img/combo/cb6.png', name: 'Trà Sữa' }
  ]
  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getDetailMovie();
      });
    this.CreateValidatorLoginForm();
    this.CreateLoginForm();
    this.getAllUserGP07();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getDetailMovie() {
    this._movieService.getDetailMovie(this.id).subscribe((result) => {
      this.currentMovie = result;
      this.detailMovieSelected = result;
      console.log(result);
    });
  }
  ngAfterViewInit(): void {
    new WOW().init();
  }
  showDialogSit() {
    this.showDialogSits = !this.showDialogSits;
    console.log(this.showDialogSits);
    if (this.MaLichChieu !== null) {
      this._userService.getAllSit(this.MaLichChieu)
        .subscribe((result) => {
          this.Sits = result;
          console.log(result);
          this.SitAtPositionE = this.Sits.DanhSachGhe.slice(0, 18);
          this.SitAtPositionF = this.Sits.DanhSachGhe.slice(18, 36);
          this.SitAtPositionG = this.Sits.DanhSachGhe.slice(36, 50);
          this.SitAtPositionI = this.Sits.DanhSachGhe.slice(50, 64);
          setTimeout(
            () => {
              if (this.currentUser != null) {
                this._userService.getHistoryUserTicket(this.currentUser.TaiKhoan)
                  .subscribe((result) => {
                    this.Sits.DanhSachGhe.forEach(element => {
                      result.DanhSachVeDaDat.forEach(item => {
                        if (item.MaGhe === element.MaGhe) {
                          //disabled sits choosed
                          let elements = this.elem.nativeElement.querySelectorAll('.sits__place');
                          elements.forEach(ele => {
                            if (item.MaGhe == ele.getAttribute('data-sits')) {
                              console.log(ele.getAttribute('data-sits'));
                              ele.classList.add('sits-state--not');
                              //note : event prevendefault ===
                              ele.removeEventListener('click', this.clickMe, false);
                            }
                          });
                        }
                      });
                    });
                  })
              }
            }
            , 200)
        });
    }
  }
  showTicket() {
    this.showDialogTicket = !this.showDialogTicket;

  }
  onSelectCombo(value: any) {
    this.selectedCombo = value;
  }
  getShowTime(value) {
    this.MaLichChieu = value;
  }
  clickMe(event) {
    if (event.target.classList.contains('sits-state--not')) {
      return;
    }
    if (this.selectedCount > 8) {
      alert('only 8');
      return;
    }
    this.selectedSit = event.target.innerHTML;
    if (event.target.classList.contains('selected-sit')) {
      event.target.classList.remove('selected-sit');
      this.selectedCount = this.selectedCount - 1;
      this.selectedArray.pop();
      this.TotalTicket.pop();
      this.totalCount -= +event.target.getAttribute('data-price');
      return;
    }
    event.target.classList.add('selected-sit');
    this.totalCount = +event.target.getAttribute('data-price') + this.totalCount;
    this.selectedCount = this.elem.nativeElement.querySelectorAll('.selected-sit').length;
    this.selectedArray.push(this.selectedSit);

    this.TotalTicket.push({ MaGhe: event.target.getAttribute('data-id'), GiaVe: event.target.getAttribute('data-price') });
  }

  putTicket() {
    this.currentUser = this._cacheService.get('CurrentUser');
    if (this.currentUser) {
      this.isLogined = true;
      this.showDialogLogin = false;

      this.isSubmitted = true;
      this.DTOPutTicket = {
        MaLichChieu: this.MaLichChieu,
        TaiKhoanNguoiDung: this.currentUser.TaiKhoan.toString(),
        DanhSachVe: this.TotalTicket
      };
      console.log(this.DTOPutTicket);
      this._userService.putTicket(this.DTOPutTicket)
        .subscribe((result) => {
          if (result) {
            setTimeout(
              () => {
                this._router.navigate(['home-page/success', this._userService.makeid()]);
                this.isSubmitted = false;
              }
              , 3000);
          }

        });
    } else {
      this.isLogined = false;
      this.showDialogLogin = true;
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
            this.showDialogLogin = false;
          },
          (error) => {
            this.hasError = true;
            // this.showDialogLogin = false;
          }
        );
    } else {
      this.hasError = true;
      // this.showDialogLogin = false;
    }
  }
  getAllUserGP07() {
    this._userService.getUserGP07().subscribe((result) => { this.listUserGP07 = result; console.log(this.listUserGP07); });
  }
}
