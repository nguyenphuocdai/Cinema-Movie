import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { CarouselComponent } from '../../../../../../node_modules/angular2-carousel';
import { trigger, transition, style, animate } from '../../../../../../node_modules/@angular/animations';
import { MovieService } from '../../../../shared/services/movie.service';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { WOW } from 'wowjs/dist/wow.min';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss'],
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
export class BookTicketComponent implements OnInit, AfterViewInit {
  isShowBookChair: Boolean = false;
  listMovie: ListMovie;
  selectedMovie: ListMovie;
  selectedCombo: any;
  selectedTime: String;
  selectedDateTime: String;
  selectedShowTime;
  detailMovieSelected: any;
  isShowLoading: Boolean = false;
  MaLichChieu: number;
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  @ViewChild('myname') liValue;
  public degree = 25;
  public moreSlides = 3;
  public delayAutoPlay = 5000;
  combo = [
    { id: 1, url: '../../../../../assets/img/combo/cb1.png', name: 'The Predator Combo' },
    { id: 2, url: '../../../../../assets/img/combo/cb2.png', name: 'Pineapple Combo' },
    { id: 3, url: '../../../../../assets/img/combo/cb3.png', name: 'CGV Combo' },
    { id: 4, url: '../../../../../assets/img/combo/cb4.png', name: 'My Combo' },
    { id: 5, url: '../../../../../assets/img/combo/cb5.png', name: 'Hotdog' },
    { id: 6, url: '../../../../../assets/img/combo/cb6.png', name: 'Trà Sữa' }
  ]

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

  constructor(
    private scriptService: ScriptService,
    private movieService: MovieService,
    private elem: ElementRef,
  ) {  
    this.scriptService.loadScript('../../../../../assets/js/external/idangerous.swiper.min.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script idangerous js');
    });
    this.scriptService.loadScript('../../../../../assets/js/external/modernizr.custom.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script modernizr  js');
    });
    this.scriptService.loadScript('../../../../../assets/js/custom.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load custom  js');
    });
    this.scriptService.loadScript('../../../../../assets/js/form.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script form js');
    });
    this.scriptService.loadScript('../../../../../assets/js/jquery.mobile.menu.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script mobile js');
    });
    this.scriptService.loadScript('../../../../../assets/js/external/form-element.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script form-element');
    });
    this.scriptService.loadScript('../../../../../assets/js/external/jquery.selectbox-0.2.min.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script selectbox ');
    });
  }

  ngOnInit() {
    this.getListMovie();
  }

  ShowBookChair() {
    this.isShowLoading = true;
    setTimeout(() => this.isShowBookChair = true, 2000);
  }
  getListMovie() {
    this.movieService.getListMovie()
      .subscribe(
        (result) => {
          this.listMovie = result;
          console.log(this.listMovie);
        },
        (err) => {
          console.log(SERVER_ERROR);
        }
      );
  }
  onSelectCombo(combo: any): void {
    this.selectedCombo = combo;
  }

  onSelect(movie: ListMovie): void {
    this.selectedMovie = movie;
    setTimeout(this.getDetailMovie(this.selectedMovie.MaPhim), 1000);
  }
  getDetailMovie(id: number) {
    this.movieService.getDetailMovie(id)
      .subscribe((result) => {
        this.detailMovieSelected = result;
      });
  }

  clickMe(event) {
    this.selectedTime = event.target.innerHTML;
    console.log(this.selectedTime);
    const elements = this.elem.nativeElement.querySelectorAll('.time-select__item');
    elements.forEach(element => {
      element.classList.remove('active-selected');
    });
    event.target.classList.add('active-selected');
  }
  onDateSelect(value) {
    console.log(value);
  }
  valueChange(value) {
    console.log(value);
    this.isShowLoading = false;
    this.isShowBookChair = value;
  }
  getShowTime(value) {
    this.MaLichChieu = value;
  }
  ngAfterViewInit(): void {
    new WOW().init();
  }
}
