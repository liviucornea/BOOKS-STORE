import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthenticationService} from './shared/services/authentication.service';
import {AlertService} from './shared/services/alert.service';
import {InterFormsService} from './shared/services/inter-forms.service';
import {AppNotificationsMSG, AppSettings} from './shared/configuration/appSettings';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Vp Plus';
  selectedLanguage = {'code': 'en', 'description': 'ENGLISH'};
  languages = AppSettings.languagesSupported;
  logoPath: String = `${environment['assetPath']}/img/logoScotiaBank.bmp`;

  constructor(public authenticationService: AuthenticationService, private interFormsSvc: InterFormsService, private _alert: AlertService,
              private router: Router, private translateService: TranslateService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const self = this;
    self.translateService.setDefaultLang('en');
    self.translateService.use('en');
    if (!self.authenticationService.authenticated()) {
      self.authenticationService.doAuthentication();
    }
  }
  changeLanguage(code: string) {
    this.interFormsSvc.languageChange(code);
  }

}
