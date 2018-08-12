import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-chair',
  templateUrl: './book-chair.component.html',
  styleUrls: ['../book-ticket/book-ticket.component.scss']
})
export class BookChairComponent implements OnInit {
  isShowPayment: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showPayment() {
    this.isShowPayment = true;
  }
}
