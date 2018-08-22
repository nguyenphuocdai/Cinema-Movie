import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [UserManagerComponent, AdminComponent, DashboardComponent, LoginDashboardComponent],
  exports: [
    UserManagerComponent, AdminComponent, DashboardComponent,
    LoginDashboardComponent
  ]
})
export class AdminModule { }
