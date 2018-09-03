import { Component, OnInit, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '../../../../../../node_modules/@angular/animations';
import { UserService } from '../../../../shared/services/user.service';
import { DTO } from '../../../../shared/models/sitDTO.model';
import { WOW } from 'wowjs/dist/wow.min';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { CacheService } from '../../../../shared/services/cache.service';
import { UserNormal } from '../../../../shared/models/user-normal.model';
import { SnackbarService } from 'ngx-snackbar';

@Component({
  selector: 'app-book-chair',
  templateUrl: './book-chair.component.html',
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
export class BookChairComponent implements OnInit, AfterViewInit {
  @Input() Time: String = '';
  @Input() MaLichChieu: number;
  @Input() selectedMovie: ListMovie;
  @Input() selectedCombo: any;
  @Input() selectedShowTime: any;
  @Output('comeback') change = new EventEmitter<boolean>();
  isShowPayment: Boolean = false;
  Sits: any;
  SitAtPositionE: any;
  SitAtPositionF: any;
  SitAtPositionG: any;
  SitAtPositionI: any;
  selectedSit: String;
  selectedArray: Array<String> = [];
  TotalTicket: Array<{ MaGhe: string, GiaVe: string }> = [];
  selectedCount: number = 1;
  totalCount = 0;
  count = 0;
  isShowLoading: boolean;
  currentUser: UserNormal;

  globalPosition = 'bottom-right';
  globalMax = 3;
  globalTimeout = 5000;
  globalBackground = '#343434';
  globalColor: string;
  globalAccent = '#2196f3';
 
  localMsg: string;
  localTimeout: number;
  localBackground: string;
  localColor: string;
  localAction: string;
  localAccent: string;


  constructor(
    private elem: ElementRef,
    private _userService: UserService,
    private _cacheService: CacheService
  ) {
    if (this._cacheService.get('CurrentUser') !== null) {
      this.currentUser = this._cacheService.get('CurrentUser');
    }
    window.scrollTo(0, window.innerHeight / 2);
  }

  ngOnInit() {
    if (this.MaLichChieu !== null) {
      this._userService.getAllSit(this.MaLichChieu)
        .subscribe((result) => {
          this.Sits = result;
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
  showPayment() {
    if (this.totalCount <= 0) {
      alert('Bạn cần phải chọn chỗ để tiến hành đặt vé!');
      return;
    }
    this.isShowLoading = true;
    setTimeout(() => this.isShowPayment = true, 2000);
  }
  clickMe(event) {
    if (event.target.classList.contains('sits-state--not')) {
      return;
    }
    if (this.selectedCount > 8) {
      alert('Chỉ được mua tối đa 8 vé / 1 đơn hàng');
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
  emitChangeValue(event) {
    // this.change.emit(event.target.checked);
    this.change.emit(false);
    console.log(event);
  }
  ngAfterViewInit(): void {
    new WOW().init();
  }
}
