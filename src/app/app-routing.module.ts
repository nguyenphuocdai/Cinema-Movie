import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/home/components/login/login.component';
import { ZaloCallbackComponent } from './modules/home/pages/zalo-callback/zalo-callback.component';
import { UATFeatureComponent } from './modules/home/pages/uat-feature/uat-feature.component';
import { BookTicketComponent } from './modules/home/pages/book-ticket/book-ticket.component';
import { SuccessTicketComponent } from './modules/home/pages/success-ticket/success-ticket.component';
import { UserInfoComponent } from './modules/home/pages/user-info/user-info.component';
import { ChangePasswordComponent } from './modules/home/pages/change-password/change-password.component';
import { MovieDetailComponent } from './modules/home/pages/movie-detail/movie-detail.component';
import { DashboardComponent } from './modules/admin-theater/pages/dashboard/dashboard.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: { state: 'page1' }

    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: HomeComponent },

    {
        path: 'zalo-callback',
        component: ZaloCallbackComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { state: 'page2' }
    },
    {
        path: 'ticket',
        component: BookTicketComponent,
        data: { state: 'page3' }
    },
    { path: 'movie-details/:id', component: MovieDetailComponent },
    { path: 'admin', loadChildren: './modules/admin-theater/admin.module#AdminModule' },
    // { path: 'dashboard', component: DashboardComponent },
    { path: 'user-info', component: UserInfoComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'success', component: SuccessTicketComponent },
    { path: 'test', component: UATFeatureComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
