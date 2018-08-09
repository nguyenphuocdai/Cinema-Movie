import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from '../../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ZaloCallbackComponent } from './pages/zalo-callback/zalo-callback.component';
import { UATFeatureComponent } from './pages/uat-feature/uat-feature.component';
import { LoginZaloDirective } from '../../shared/directives/login-zalo.directive';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ZaloCallbackComponent,
    UATFeatureComponent,
    LoginZaloDirective
  ],
  exports: [
    HomeComponent,
    ZaloCallbackComponent,

  ],
  providers: [
  ]
})
export class HomeModule { }
