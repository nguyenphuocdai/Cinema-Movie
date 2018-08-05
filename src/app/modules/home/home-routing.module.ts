import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ZaloCallbackComponent } from './pages/zalo-callback/zalo-callback.component';

const appRoutes: Routes = [
    {
        path: 'home',
        children: [
            { path: '', component: HomeComponent },
            // { path: ':id', component: User }
        ],
        data: {
            animation: {
                value: 'home',
            }
        }
    },
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
