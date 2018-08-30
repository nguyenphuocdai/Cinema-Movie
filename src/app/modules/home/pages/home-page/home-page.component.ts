import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { MovieService } from '../../../../shared/services/movie.service';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { trigger, state, style, transition, animate } from '../../../../../../node_modules/@angular/animations';
import { WOW } from 'wowjs/dist/wow.min';

declare var $: any;
declare var require: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
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
export class HomePageComponent implements OnInit, AfterViewInit {
  current: any;
  prevRating: any;
  nextRating: any;
  state = 'hide';
  listMovie: ListMovie;
  slides: { img: string; }[];

  introMovie = [
    { id: 1, url: require('../../../../../assets/img/backgrounds/leaf.jpg'), cate: "Comedy", actor: "Drama", IMB: "9.7", total: "10" },
    { id: 2, url: require('../../../../../assets/img/backgrounds/wynonna.jpg'), cate: "Toham", actor: "Damma", IMB: "8.7", total: "10" },
    { id: 3, url: require('../../../../../assets/img/backgrounds/war-is-coming.jpg'), cate: "Doham", actor: "LaiHam", IMB: "8.6", total: "10" },
    { id: 4, url: require('../../../../../assets/img/backgrounds/drive-angry.jpg'), cate: "NmHam", actor: "Break", IMB: "9.1", total: "10" },
    { id: 5, url: require('../../../../../assets/img/backgrounds/red-sonja.jpg'), cate: "Comedy", actor: "Point", IMB: "9.2", total: "10" },
    { id: 6, url: require('../../../../../assets/img/backgrounds/movie-time11.jpg'), cate: "Comeon", actor: "Continue", IMB: "9.5", total: "10" },
  ]

  constructor(
    private scriptService: ScriptService,
    private movieService: MovieService,
    public el: ElementRef
  ) {
    window.scrollTo(0, 0);
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
  slideConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 5000
  };

  ngOnInit() {
    this.getListMovie();
    this.slides = [
      { img: ('../../../../../assets/img/backgrounds/banner-slide.jpg') },
      { img: ('../../../../../assets/img/backgrounds/momo_9k.jpg') },
      { img: ('../../../../../assets/img/backgrounds/banner-slide1.jpg') },
      { img: ('../../../../../assets/img/backgrounds/banner-slide2.jpg') }
    ];
  }

  getListMovie() {
    this.movieService.getListMovie()
      .subscribe(
        (result) => {
          this.listMovie = result;
          console.log(result);
        },
        (err) => {
          console.log(SERVER_ERROR);
        }
      );
  }
  // slide banner
  afterChange(e) {
    // console.log('afterChange');
  }

  ngAfterViewInit(): void {
    $('.owl-carousel').owlCarousel({
      items: 4,
      lazyLoad: true,
      loop: false,
      margin: 10,
      autoplay: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
    // $('.single-item').slick();
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

    new WOW().init();
  }
}
