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
import { MovieComingSoonComponent } from './pages/movie-coming-soon/movie-coming-soon.component';
import { MovieShowingComponent } from './pages/movie-showing/movie-showing.component';
import { NewsComponent } from './pages/news/news.component';
import { MovieAccountComponent } from './pages/movie-account/movie-account.component';


const appRoutes: Routes = [
    {
        path: 'home-page',
        children: [
            {
                path: '', component: HomePageComponent,
                data: { title: "Trang chủ" }
            },
            {
                path: 'login', component: LoginComponent,
                data: { title: "Đăng nhập / Đăng ký" }
            },
            {
                path: 'ticket', component: BookTicketComponent,
                data: { title: "Đặt vé" }
            },
            {
                path: 'user-info', component: UserInfoComponent,
                data: { title: "Thông tin người dùng" }
            },
            {
                path: 'change-password', component: ChangePasswordComponent,
                data: { title: "Đổi mật khẩu" }
            },
            {
                path: 'movie-comming-soon', component: MovieComingSoonComponent,
                data: { title: "Phim sắp chiếu" }
            },
            {
                path: 'movie-showing', component: MovieShowingComponent,
                data: { title: "Phim đang chiếu" }
            },
            {
                path: 'news', component: NewsComponent,
                data: { title: "Tin tức phim" }
            },
            {
                path: 'movie-account', component: MovieAccountComponent,
                data: { title: "Tài khoản" }
            },
            {
                path: 'success/:successId', component: SuccessTicketComponent,
                data: { title: "Đặt vé thành công" }
            },
            {
                path: 'movie-details/:id', component: MovieDetailComponent,
                data: { title: "Chi tiết phim" }
            },
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
