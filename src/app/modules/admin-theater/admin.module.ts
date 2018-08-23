import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [UserManagerComponent, AdminComponent, DashboardComponent, LoginDashboardComponent],
  exports: [
    UserManagerComponent, AdminComponent, DashboardComponent,
    LoginDashboardComponent
  ]
})
export class AdminModule { }
