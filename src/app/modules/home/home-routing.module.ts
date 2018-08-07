import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
const appRoutes: Routes = [
    {
        path: 'home',
        children:
            [
                { path: '', component: HomeComponent }
            ],
        data: {
            animation: {
                value: 'home',
            }
        },
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
