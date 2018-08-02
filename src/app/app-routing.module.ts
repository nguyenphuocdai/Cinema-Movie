import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/home/components/login/login.component';

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
        path: 'login',
        component: LoginComponent,
        data: {
            animation: {
                value: 'login',
            }
        }
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
