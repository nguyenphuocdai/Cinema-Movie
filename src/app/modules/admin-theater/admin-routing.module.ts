import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';
import { MovieManagerComponent } from './pages/movie-manager/movie-manager.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        // path: '',
        // component: AdminComponent,
        // children: [
        //     { path: 'dashboard', component: DashboardComponent },
        //     { path: 'user', component: UserManagerComponent },
        //     { path: 'login-dashboard', component: LoginDashboardComponent },
        //     // { path: '**', component: AdminComponent }
        // ]
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                children: [
                    {
                        path: '', component: DashboardComponent,
                        data: { title: "Quản lý hệ thống" }
                    },
                    {
                        path: 'user', component: UserManagerComponent,
                        data: { title: "Quản lý người dùng" }
                    },
                    {
                        path: 'movie', component: MovieManagerComponent,
                        data: { title: "Quản lý phim" }
                    },
                    {
                        path: 'login-dashboard', component: LoginDashboardComponent,
                        data: { title: "Đăng nhập" }
                    },
                    // { path: '*', component: DashboardComponent },
                    { path: '*', redirectTo: '/admin', pathMatch: 'full' },
                    { path: '**', component: AdminComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
