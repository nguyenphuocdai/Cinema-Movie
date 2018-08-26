import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { AdminDialogComponent } from '../../shared/components/admin-dialog/admin-dialog.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LoadersCssModule } from 'angular2-loaders-css';
import { LoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    CommonModule,
    LoadersCssModule,
    LoadingModule
  ],
  declarations: [
    DialogComponent,
    AdminDialogComponent,
    LoaderComponent,
  ],
  exports: [
    DialogComponent,
    AdminDialogComponent,
    LoaderComponent,
    LoadersCssModule,
    LoadingModule
  ]
})
export class SharedModuleModule { }
