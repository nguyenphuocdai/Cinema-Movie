import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from '../../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
