import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { ZaloCallbackComponent } from './pages/zalo-callback/zalo-callback.component';
import { UATFeatureComponent } from './pages/uat-feature/uat-feature.component';
import { LoginZaloDirective } from '../../shared/directives/login-zalo.directive';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { BrowserModule } from '../../../../node_modules/@angular/platform-browser';
import { BookChairComponent } from './pages/book-chair/book-chair.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ScrollToIdDirective } from '../../shared/directives/scroll-to-id.directive';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { SuccessTicketComponent } from './pages/success-ticket/success-ticket.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { SlickModule } from '../../../../node_modules/ngx-slick';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { TicketBookingComponent } from './components/ticket-booking/ticket-booking.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MovieComingSoonComponent } from './pages/movie-coming-soon/movie-coming-soon.component';
import { MovieShowingComponent } from './pages/movie-showing/movie-showing.component';
import { NewsComponent } from './pages/news/news.component';
import { MovieAccountComponent } from './pages/movie-account/movie-account.component';
import { BookTicketMiniComponent } from './pages/book-ticket-mini/book-ticket-mini.component';


@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SlickModule.forRoot(),
    HomeRoutingModule,
    SharedModuleModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    ZaloCallbackComponent,
    UATFeatureComponent,
    LoginZaloDirective,
    BookTicketComponent,
    BookChairComponent,
    PaymentComponent,
    ScrollToIdDirective,
    SuccessTicketComponent,
    UserInfoComponent,
    ChangePasswordComponent,
    MovieDetailComponent,
    HomePageComponent,
    TicketBookingComponent,
    MovieComingSoonComponent,
    MovieShowingComponent,
    NewsComponent,
    MovieAccountComponent,
    BookTicketMiniComponent
  ],
  exports: [
    HomeComponent,
    ZaloCallbackComponent,
    ScrollToIdDirective,
    HomeComponent,
    LoginComponent,
    ZaloCallbackComponent,
    UATFeatureComponent,
    LoginZaloDirective,
    BookTicketComponent,
    BookChairComponent,
    PaymentComponent,
    ScrollToIdDirective,

    SuccessTicketComponent,
    UserInfoComponent,
    ChangePasswordComponent,
    MovieDetailComponent,
    HomePageComponent
  ],
  providers: [
  ]
})
export class HomeModule { }
