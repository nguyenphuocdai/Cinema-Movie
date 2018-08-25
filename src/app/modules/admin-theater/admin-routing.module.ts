import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';


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
                    { path: '', component: DashboardComponent },
                    { path: 'user', component: UserManagerComponent },
                    { path: 'login-dashboard', component: LoginDashboardComponent },
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
