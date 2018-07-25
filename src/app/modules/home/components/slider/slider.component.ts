import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SwiperComponent } from '../../../../../../node_modules/ngx-useful-swiper';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  images: string[];
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;

  config: any = {
    autoplay: {
      delay: 5000,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    paginationClickable: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 1500,
    initialSlide: 0,
    fadeEffect: {
      crossFade: true
    }
  };

  constructor() {
  }
  ngOnInit() {
    this.loadImages();
  }
  loadImages() {
    this.images = [
      '../../../../../assets/img/banners/banner-sm.jpg',
      '../../../../../assets/img/banners/banner-sm.jpg',
      '../../../../../assets/img/banners/banner-sm.jpg'
    ];
  }
  next() {
    this.usefulSwiper.swiper.slideNext();
  }
}
