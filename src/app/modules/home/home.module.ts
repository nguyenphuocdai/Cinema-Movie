import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from '../../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { ZaloCallbackComponent } from './pages/zalo-callback/zalo-callback.component';
import { UATFeatureComponent } from './pages/uat-feature/uat-feature.component';
import { LoginZaloDirective } from '../../shared/directives/login-zalo.directive';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
// import { CarouselModule } from 'angular2-carousel';
import { BrowserModule } from '../../../../node_modules/@angular/platform-browser';
import { AngularDateTimePickerModule } from './components/datetime-picker';
import { CarouselModule } from './components/carousel-movie';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    AngularDateTimePickerModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    ZaloCallbackComponent,
    UATFeatureComponent,
    LoginZaloDirective,
    BookTicketComponent
  ],
  exports: [
    HomeComponent,
    ZaloCallbackComponent,

  ],
  providers: [
  ]
})
export class HomeModule { }
