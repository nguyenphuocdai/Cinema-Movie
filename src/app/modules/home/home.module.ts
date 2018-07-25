import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { PopularVideoComponent } from './components/popular-video/popular-video.component';
import { SliderComponent } from './components/slider/slider.component';
import { SwiperModule } from 'ngx-useful-swiper';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule
  ],
  declarations: [
    HomeComponent,
    ChannelsComponent,
    PopularVideoComponent,
    SliderComponent
  ],
  exports: [
    HomeComponent,
    PopularVideoComponent,
    ChannelsComponent,
    SwiperModule
  ]
})
export class HomeModule { }
