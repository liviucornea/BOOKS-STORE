import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';
import {AppNotificationsMSG, AppSettings} from '../../configuration/appSettings';
import {InterFormsService} from '../../services/inter-forms.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, AfterViewInit {
  public userID: string;
  dataSources: Array<any>; // = AppSettings.appDataSources;
  dataSource: string;
  isLoggingIn = true;

  constructor(private loginService: AuthenticationService, private interFormSvc: InterFormsService, private _alert: AlertService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const self = this;
    self.userID = 'Guest';
    self.interFormSvc.startSpinner('card', AppNotificationsMSG.loadingActiveDirectoryInfo);
    self.loginService.loadADUserProfile().subscribe(data => {
      self.userID = data.loginId;
      self.dataSources = this.interFormSvc.availableDataSources;
      self.dataSource = this.dataSources[0].id;
      self.isLoggingIn = false;
      self.cd.markForCheck();
      self.interFormSvc.stopSpinner();
    }, ( (error) => {
      self.interFormSvc.stopSpinner();
      self._alert.error(AppNotificationsMSG.errorLoadingActiveDirectoryInfo);
      console.log(error);
    }));
  }

  ngAfterViewInit() {
    const self = this;
    const subscription =  self.interFormSvc.loginActionEmitter.subscribe(data => {
      if (data && self.dataSource) {
        subscription.unsubscribe();
        self.doLogin(self.dataSource);
      }
    })
  }

  doLogin(dsValue: string) {
    this.loginService.login(this.userID, dsValue);

  }

}
