import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {AlertService} from '../shared/services/alert.service';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {Delegate} from '../shared/domain/Delegate';
import {DelegateService} from './delegate.service';
import * as _ from 'lodash';
import * as moment from "moment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public delegates: Array<Delegate> = [];

  constructor(public authenticationService: AuthenticationService, private cd: ChangeDetectorRef,
              private interformSvc: InterFormsService, private delegatesSvc: DelegateService,
              private alert: AlertService, private router: Router) {
  }

  ngOnInit() {
    const self = this;
    self.delegates = [];
    self.interformSvc.startSpinner('card', 'Loading delegates list');
    if (self.authenticationService.authenticated()) {
      self.interformSvc.loadBusinessInfo().switchMap
      (x => self.delegatesSvc.loadAllDelegates())
        .subscribe(data => {
          self.delegates = data.filter(item => item.FromUserID === self.authenticationService.currentUser.UserID);
          self.uiReady();
          self.interformSvc.stopSpinner();
        },
          (error) => {
            self.alert.addAlert('Error when loading delegates list: ' + error.toString(), 'danger');
            self.interformSvc.stopSpinner();
          }
          );
    } else {
      self.authenticationService.loadADUserProfile().switchMap
      (resp => self.interformSvc.loadBusinessInfo()).switchMap
      (businessInfo => self.delegatesSvc.loadAllDelegates()).subscribe(data => {
        self.delegates = data.filter(item => item.FromUserID === self.authenticationService.currentUser.UserID);
        self.uiReady();
        self.interformSvc.stopSpinner();
      },
        (error) => {
          self.alert.addAlert('Error when loading delegates list: ' + error.toString(), 'danger');
          self.interformSvc.stopSpinner();
        }
      );
    }
  }

  uiReady(): void {
    const self = this;
    self.delegates.forEach(item => {
      const toUser = self.interformSvc.allUsers.find(user => user.UserID === item.ToUserID);
      if (toUser) {
        item.ToUserFirstName = toUser.FirstName;
        item.ToUserLastName = toUser.LastName;
        item.ToUserEmail = toUser.EMail;
      }
    });
  }

  ngAfterViewInit(): void {
    //  this.router.navigate(['/appointments']);
  }

  getNewDelegate(delegate: Delegate): void {
    const self = this;
    self.delegates.push(delegate);
    self.uiReady();
    self.cd.markForCheck();
  }

  callToDeleteDelegate(delegate: Delegate): void {
    const self = this;
    self.alert.addAlertAndRequestAnswer('Do you want to delete delegate?', 'warning', 'Delete delegate');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.deleteDelegate(delegate);

    });
    return;
  }

  deleteDelegate(delegate: Delegate): void {
    const self = this;
    self.interformSvc.startSpinner('card', 'Delegate deletion in progress..');
    self.delegatesSvc.deleteDelegate(delegate.AccessDelegationID)
      .subscribe(data => {
        if (data.statusCode === 'VPA000') {
          self.interformSvc.stopSpinner();
          self.alert.addAlert('Delegate successfully deleted ');
        }
      }, () => {
        self.interformSvc.stopSpinner();
        self.alert.addAlert('An error occurred while doing delegate  deletion');
      }, () => {
        self.delegates = _.pull(self.delegates, delegate);
      });
  }
}
