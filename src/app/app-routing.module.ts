import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZaloCallbackComponent } from './modules/home/pages/zalo-callback/zalo-callback.component';

const appRoutes: Routes = [
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
    { path: 'admin', loadChildren: './modules/admin-theater/admin.module#AdminModule' },
    { path: 'zalo-callback', component: ZaloCallbackComponent },
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    // { path: '*', redirectTo: '/home-page', pathMatch: 'full' },
    // { path: '**', redirectTo: '/home-page', pathMatch: 'full' },
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
