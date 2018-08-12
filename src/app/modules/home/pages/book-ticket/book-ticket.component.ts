import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { CarouselComponent } from '../../../../../../node_modules/angular2-carousel';
import { DatepickerOptions } from '../../../../../../node_modules/ng2-datepicker';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss']
})
export class BookTicketComponent implements OnInit {

  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  public degree = 25;
  public moreSlides = 3;
  toggle() {
    this.topCarousel.toggleMode();
  }

  // tslint:disable-next-line:member-ordering
  date: Date = new Date();
  // tslint:disable-next-line:member-ordering
  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };

  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('../../../../../assets/js/external/idangerous.swiper.min.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script authenticator js');
    });
    this.scriptService.loadScript('../../../../../assets/js/external/modernizr.custom.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script  js');
    });
    this.scriptService.loadScript('../../../../../assets/js/custom.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script  js');
    });
    this.scriptService.loadScript('../../../../../assets/js/form.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script  js');
    });
    this.scriptService.loadScript('../../../../../assets/js/jquery.mobile.menu.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script  js');
    });
    this.scriptService.loadScript('../../../../../assets/js/external/form-element.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script');
    });
    this.scriptService.loadScript('../../../../../assets/js/external/jquery.selectbox-0.2.min.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script');
    });
  }

  ngOnInit() {
  }

}
