import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { trigger, transition, animate, style } from '../../../../../../node_modules/@angular/animations';

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
export class BookChairComponent implements OnInit {
  @Input() Time: String = '';

  isShowPayment: Boolean = false;
  selectedSit: String;
  selectedArray: Array<String> = [];
  // tslint:disable-next-line:no-inferrable-types
  selectedCount: number = 1;
  totalCount = 0;
  count = 0;
  isShowLoading: boolean;
  constructor(
    private elem: ElementRef

  ) { }

  ngOnInit() {
    console.log(this.Time);
  }
  showPayment() {
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
      this.totalCount -= +event.target.getAttribute('data-price');
      return;
    }
    event.target.classList.add('selected-sit');
    this.totalCount = +event.target.getAttribute('data-price') + this.totalCount;
    console.log(this.totalCount);
    this.selectedCount = this.elem.nativeElement.querySelectorAll('.selected-sit').length;
    this.selectedArray.push(this.selectedSit);
  }
}
