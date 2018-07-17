import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptors/http.token.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CollapseButtonComponent } from './shared/components/buttons/collapse-button/collapse-button.component';
import { FavoriteButtonComponent } from './shared/components/buttons/favorite-button/favorite-button.component';
import { AuthDirective } from './shared/directives/auth.directive';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { SafePipe } from './shared/pipes/safe.pipe';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoadingModule } from 'ngx-loading';
import { LoadersCssModule } from 'angular2-loaders-css';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FavoriteButtonComponent,
    CollapseButtonComponent,
    AuthDirective,
    CapitalizePipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    LoadingModule,
    LoadersCssModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
