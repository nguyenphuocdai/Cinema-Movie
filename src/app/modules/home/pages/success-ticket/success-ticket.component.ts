import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-success-ticket',
  templateUrl: './success-ticket.component.html',
  styleUrls: ['../book-ticket/book-ticket.component.scss']
})
export class SuccessTicketComponent implements OnInit {
  successId : any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.successId = params['successId'];
      console.log(this.successId);
    });
    
  }

}
