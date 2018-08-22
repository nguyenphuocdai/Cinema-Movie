import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', component: AdminComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user', component: UserManagerComponent },
            { path: 'login-dashboard', component: LoginDashboardComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
