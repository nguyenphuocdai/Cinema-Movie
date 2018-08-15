import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, query, group, style, animate } from '../../../../../../node_modules/@angular/animations';

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
export class PaymentComponent implements OnInit {
  @Input() TotalTicket: String = '';
  @Input() TotalPrice: String = '';
  constructor() { }

  ngOnInit() {
    console.log(this.TotalTicket + ' ' + this.TotalPrice);
  }

}
