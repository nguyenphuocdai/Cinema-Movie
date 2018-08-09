import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { LogoutZaloDirective } from '../shared/directives/logout-zalo.directive';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule

  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LogoutZaloDirective

  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
