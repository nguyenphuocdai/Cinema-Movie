import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from '../../shared/components/pagination/ngx-pagination.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MovieManagerComponent } from './pages/movie-manager/movie-manager.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxPaginationModule,
    SharedModuleModule,
  ],
  declarations: [
    UserManagerComponent,
    AdminComponent,
    DashboardComponent,
    LoginDashboardComponent,
    MovieManagerComponent
  ],
  exports: [
    UserManagerComponent, AdminComponent, DashboardComponent,
    LoginDashboardComponent, MovieManagerComponent
  ],
  providers: [DatePipe]
})
export class AdminModule { }
