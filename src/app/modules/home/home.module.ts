import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from '../../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { ZaloCallbackComponent } from './pages/zalo-callback/zalo-callback.component';
import { UATFeatureComponent } from './pages/uat-feature/uat-feature.component';
import { LoginZaloDirective } from '../../shared/directives/login-zalo.directive';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
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
