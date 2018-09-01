import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/http.token.interceptor';
import { CollapseButtonComponent } from './shared/components/buttons/collapse-button/collapse-button.component';
import { FavoriteButtonComponent } from './shared/components/buttons/favorite-button/favorite-button.component';
import { AuthDirective } from './shared/directives/auth.directive';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { SafePipe } from './shared/pipes/safe.pipe';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeModule } from './modules/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxZaloService } from './shared/services/ngx-zalo.service';
import { NgxZaloModule } from './shared/ngx-zalo.module';
import { ScriptLoaderModule } from 'ngx-script-loader';
import { LocalStorageServiceModule } from './shared/ng2-cache-service';
import { MovieService } from './shared/services/movie.service';
import { HttpModule } from '@angular/http';
import { AdminModule } from './modules/admin-theater/admin.module';
import { UserService } from './shared/services/user.service';
import { TitleService } from './shared/services/title.service';

const zaloConfigs = {
  version: environment.zaloConfigs.version,
  appId: environment.zaloConfigs.appId,
  redirectUrl: environment.zaloConfigs.redirectUrl,
};

@NgModule({
  declarations: [
    AppComponent,

    FavoriteButtonComponent,
    CollapseButtonComponent,
    AuthDirective,
    CapitalizePipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AdminModule,
    CoreModule,
    HomeModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxZaloModule,
    ScriptLoaderModule,
    LocalStorageServiceModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MovieService,
    UserService,
    TitleService
  ],
  exports: [
    NgxZaloModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngxZaloService: NgxZaloService) {
    ngxZaloService.init(zaloConfigs);
  }
}
