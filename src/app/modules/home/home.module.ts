import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { TabsVideoComponent } from './components/tabs-video/tabs-video.component';
import { EditorsChoiceComponent } from './components/editors-choice/editors-choice.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { PopularVideoComponent } from './components/popular-video/popular-video.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, TabsVideoComponent, EditorsChoiceComponent, ChannelsComponent, PopularVideoComponent],
  exports: [HomeComponent, PopularVideoComponent, TabsVideoComponent, EditorsChoiceComponent, ChannelsComponent]
})
export class HomeModule { }
