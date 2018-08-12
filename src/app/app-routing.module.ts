import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/home/components/login/login.component';
import { ZaloCallbackComponent } from './modules/home/pages/zalo-callback/zalo-callback.component';
import { UATFeatureComponent } from './modules/home/pages/uat-feature/uat-feature.component';
import { BookTicketComponent } from './modules/home/pages/book-ticket/book-ticket.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            animation: {
                value: 'home',
            }
        }
    },
    {
        path: 'zalo-callback',
        component: ZaloCallbackComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            animation: {
                value: 'login',
            }
        }
    },
    { path: 'ticket', component: BookTicketComponent },
    { path: 'test', component: UATFeatureComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
