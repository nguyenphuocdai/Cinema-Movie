import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxZaloService } from './services/ngx-zalo.service';

// tslint:disable-next-line:prefer-const
let zaloConfigs: { version: string, appId: string, redirectUrl: string };

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    NgxZaloService,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class NgxZaloModule {
}
