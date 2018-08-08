import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  current: any;
  prevRating: any;
  nextRating: any;

  constructor(private scriptService: ScriptService) {
    // this.scriptService.loadScript('../../../../../assets/js/main.js').subscribe(() => {
    // }, (error) => {
    //   console.log('Failed to load script main js');
    // });
  }
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    $('.hero-area-slider').owlCarousel({
      loop: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true, // Stops autoplay
      nav: false,
      items: 1,
      responsive: {
        992: {
          dots: false,
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
