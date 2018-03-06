import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotificationComponent } from './components/notification/notification.component';
import {AlertService} from './services/alert.service';
import {Logger, Options} from 'angular2-logger/core';
import {InterFormsService} from './services/inter-forms.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthorizationService} from './services/authorization.service';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AuthorizationGuard} from './services/authorize-guard.service';
import {AuthenticationGuard} from './services/authentication-guard.service';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import {Http} from '@angular/http';
import { DynamicDescriptionComponent } from './components/dynamic-description/dynamic-description.component';
import {RouterModule} from '@angular/router';
import { TypeAheadComponent } from './components/type-ahead/type-ahead.component';
import {FormsModule} from '@angular/forms';
import {ExportToExcelService} from './services/export-to-excel.service';
import {ConfirmDeactAppointmentEditGuardService} from './services/confirm-deact-appointment-edit-guard.service';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [HeaderComponent, NotAuthorizedComponent, NotificationComponent, SpinnerComponent,
    DynamicDescriptionComponent, TypeAheadComponent],
  exports : [HeaderComponent, NotAuthorizedComponent, TypeAheadComponent,
    NotificationComponent, SpinnerComponent, TranslateModule, DynamicDescriptionComponent],
  providers: [AlertService, InterFormsService, AuthenticationService, AuthorizationService,
    AuthenticationGuard, AuthorizationGuard, ExportToExcelService,
    ConfirmDeactAppointmentEditGuardService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AlertService,  Logger, Options, InterFormsService]
    };
  }
}
