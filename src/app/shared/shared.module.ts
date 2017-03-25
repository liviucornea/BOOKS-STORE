import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AlertService } from './service/alert.service';
import {AuthenticationService, authHttpServiceFactory} from './service/authentication.service';
import {AuthenticationGuard} from './service/authentication.guard';
import {AuthorizationGuard} from './service/authorize.guard.service';
import {AuthorizationService} from './service/authorize.service';
import {Http, HttpModule, RequestOptions} from '@angular/http';

import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PageComponent} from './components/page/page.component';
import {CurrencyPipe} from './pipes/currency.pipe';
import {ContainerCardComponent} from './components/container-card/container-card.component';
import {CountdownComponent} from 'app/shared/components/countdown/countdown.component';
import {provideAuth, AuthHttp, AuthConfig} from 'angular2-jwt';
import {TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {NotificationComponent} from './components/notification/notification';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [    NotificationComponent,
    CurrencyPipe,
    ContainerCardComponent,
    CountdownComponent,
    PageComponent,
    NotAuthorizedComponent],
  exports: [
    NotificationComponent,
    CurrencyPipe,
    ContainerCardComponent,
    CountdownComponent,
    PageComponent,
    NotAuthorizedComponent,
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    AuthorizationGuard,
    AuthorizationService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AlertService]
    };
  }
}
