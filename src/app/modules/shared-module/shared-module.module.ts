import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { AdminDialogComponent } from '../../shared/components/admin-dialog/admin-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    AdminDialogComponent
  ],
  exports: [
    DialogComponent,
    AdminDialogComponent
  ]
})
export class SharedModuleModule { }
