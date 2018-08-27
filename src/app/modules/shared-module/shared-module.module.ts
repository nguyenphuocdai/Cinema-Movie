import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { AdminDialogComponent } from '../../shared/components/admin-dialog/admin-dialog.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LoadersCssModule } from 'angular2-loaders-css';
import { LoadingModule } from 'ngx-loading';
import { NgxDeleteConfirmModule } from '../../shared/components/comfirm-delete/ngx-delete-confirm.module';
import { CKEditorModule } from '../../shared/components/ckeditor/ckeditor.module';
import { AngularDateTimePickerModule } from '../home/components/datetime-picker';
@NgModule({
  imports: [
    CommonModule,
    LoadersCssModule,
    LoadingModule,
    NgxDeleteConfirmModule.forRoot(),
    CKEditorModule,
    AngularDateTimePickerModule,
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
    LoadingModule,
    NgxDeleteConfirmModule,
    CKEditorModule,
    AngularDateTimePickerModule,
  ]
})
export class SharedModuleModule { }
