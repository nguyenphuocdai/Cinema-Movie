import { Component, OnInit, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '../../../../../../node_modules/@angular/animations';
import { UserService } from '../../../../shared/services/user.service';
import { DTO } from '../../../../shared/models/sitDTO.model';
import { WOW } from 'wowjs/dist/wow.min';

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
  // tslint:disable-next-line:no-output-rename
  @Output('comeback') change = new EventEmitter<boolean>();
  isShowPayment: Boolean = false;
  Sits: DTO;
  SitAtPositionE: any;
  SitAtPositionF: any;
  SitAtPositionG: any;
  SitAtPositionI: any;
  selectedSit: String;
  selectedArray: Array<String> = [];
  TotalTicket: Array<{ MaGhe: string, GiaVe: string }> = [];
  // tslint:disable-next-line:no-inferrable-types
  selectedCount: number = 1;
  totalCount = 0;
  count = 0;
  isShowLoading: boolean;
  constructor(
    private elem: ElementRef,
    private _userService: UserService
  ) {

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
          console.log(this.SitAtPositionE);
          console.log(this.SitAtPositionF);
          console.log(this.SitAtPositionG);
          console.log(this.SitAtPositionI);
          console.log(this.Sits);
        });
    }
    console.log(this.MaLichChieu);
  }
  showPayment() {
    if (this.totalCount <= 0) {
      alert('chưa chọn vé');
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
  emitChangeValue(event) {
    // this.change.emit(event.target.checked);
    this.change.emit(false);
    console.log(event);
  }
  ngAfterViewInit(): void {
    new WOW().init();
  }
}
