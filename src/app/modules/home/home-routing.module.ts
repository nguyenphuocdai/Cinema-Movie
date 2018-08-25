import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { SuccessTicketComponent } from './pages/success-ticket/success-ticket.component';
import { UATFeatureComponent } from './pages/uat-feature/uat-feature.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';


const appRoutes: Routes = [
    {
        path: 'home-page',
        children: [
            { path: '', component: HomePageComponent },
            { path: 'login', component: LoginComponent },
            { path: 'ticket', component: BookTicketComponent },
            { path: 'user-info', component: UserInfoComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'success', component: SuccessTicketComponent },
            { path: 'movie-details/:id', component: MovieDetailComponent },
            { path: 'test', component: UATFeatureComponent },
            { path: '*', redirectTo: '/home-page', pathMatch: 'full' },
            { path: '**', component: HomePageComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {

}
