import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxZaloService } from './services/ngx-zalo.service';
import { CacheImageDirective } from './directives/cache-image.directive';

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
  CacheImageDirective],
  exports: [
  ]
})
export class NgxZaloModule {
}
