import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { MovieService } from '../../../../shared/services/movie.service';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { trigger, state, style, transition, animate } from '../../../../../../node_modules/@angular/animations';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  current: any;
  prevRating: any;
  nextRating: any;
  state = 'hide';
  listMovie: ListMovie;

  constructor(
    private scriptService: ScriptService,
    private movieService: MovieService,
    public el: ElementRef
  ) {
    // this.scriptService.loadScript('../../../../../assets/js/main.js').subscribe(() => {
    // }, (error) => {
    //   console.log('Failed to load script main js');
    // });
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }

  }

  ngOnInit() {
    this.getListMovie();
  }

  getListMovie() {
    this.movieService.getListMovie()
      .subscribe(
        (result) => {
          this.listMovie = result;
        },
        (err) => {
          console.log(SERVER_ERROR);
        }
      );
  }

  ngAfterViewInit(): void {
    $('.hero-area-slider').owlCarousel({
      loop: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true, // Stops autoplay
      nav: false,
      items: 1,
      responsive: {
        992: {
          dots: true,
        }
      }
    });
    $('.hero-area-slider').on('changed.owl.carousel', function (property) {
      this.current = property.item.index;
      this.prevRating = $(property.target).find('.owl-item').eq(this.current).prev().find('.hero-area-slide').html();
      this.nextRating = $(property.target).find('.owl-item').eq(this.current).next().find('.hero-area-slide').html();
      $('.thumb-prev .hero-area-slide').html(this.prevRating);
      $('.thumb-next .hero-area-slide').html(this.nextRating);
    });
    $('.thumb-next').on('click', function () {
      $('.hero-area-slider').trigger('next.owl.carousel', [300]);
      return false;
    });
    $('.thumb-prev').on('click', function () {
      $('.hero-area-slider').trigger('prev.owl.carousel', [300]);
      return false;
    });
    $('.news-slider').owlCarousel({
      loop: true,
      dots: true,
      autoplay: false,
      autoplayTimeout: 4000,
      nav: false,
      items: 1,
      responsive: {
        992: {
          dots: false,
        }
      }
    });
    $('.news-slider').on('changed.owl.carousel', function (property) {
      this.current = property.item.index;
      this.prevRating = $(property.target).find('.owl-item').eq(this.current).prev().find('.single-news').html();
      this.nextRating = $(property.target).find('.owl-item').eq(this.current).next().find('.single-news').html();
      $('.news-prev .single-news').html(this.prevRating);
      $('.news-next .single-news').html(this.nextRating);
    });
    $('.news-next').on('click', function () {
      $('.news-slider').trigger('next.owl.carousel', [300]);
      return false;
    });
    $('.news-prev').on('click', function () {
      $('.news-slider').trigger('prev.owl.carousel', [300]);
      return false;
    });
    // $('.portfolio-item').isotope();
    // $('.portfolio-menu li').on('click', function () {
    //   $('.portfolio-menu li').removeClass('active');
    //   $(this).addClass('active');
    //   this.selector = $(this).attr('data-filter');
    //   $('.portfolio-item').isotope({
    //     filter: this.selector
    //   });
    // });
    /*----------------------------
      START - Preloader
      ------------------------------ */
    $(window).load(function () {
      $('#preloader').fadeOut(500);
    });
  }
}
