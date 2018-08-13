import { Component, OnInit } from '@angular/core';
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
  isShowPayment: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showPayment() {
    this.isShowPayment = true;
    window.scrollTo(0, 0);
  }
}
