import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotAuthorizedComponent} from './components/not-authorized/not-authorized.component';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {AuthenticationService} from './services/authentication.service';
import {AuthorizationService} from './services/authorization.service';
import {AlertService} from './services/alert.service';
import {AuthorizationGuard} from './services/authorize-guard.service';
import {AuthenticationGuard} from './services/authentication-guard.service';
import {FormsModule} from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {InterFormsService} from './services/inter-forms.service';
import { NotificationComponent } from './components/notification/notification.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {PagerService} from './components/pagination/pager.service';
import {ExportToExcelService} from './services/export-to-excel.service';
import {Logger} from 'angular2-logger/core';
@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [NotAuthorizedComponent, LoginComponent, SpinnerComponent, NotificationComponent, PaginationComponent],
  exports: [NotAuthorizedComponent, LoginComponent, SpinnerComponent, NotificationComponent, PaginationComponent],
  providers: [AuthenticationService, AuthenticationGuard,
              AuthorizationService,    AuthorizationGuard, InterFormsService, PagerService, ExportToExcelService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AlertService, InterFormsService, PagerService, Logger ]
    };
  }
}
