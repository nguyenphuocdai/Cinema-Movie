import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { WOW } from 'wowjs/dist/wow.min';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }

  constructor(

  ) {

  }



  ngOnInit() {

  }


}
