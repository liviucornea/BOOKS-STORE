import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {AlertService} from '../shared/services/alert.service';
import {DelegateService} from '../home/delegate.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Delegate} from '../shared/domain/Delegate';
import * as moment from 'moment';
import {UserDTO} from '../shared/DTO/UserDTO';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-edit-delegate',
  templateUrl: './edit-delegate.component.html',
  styleUrls: ['./edit-delegate.component.scss']
})
export class EditDelegateComponent implements OnInit {
  @Input()
  existingDelegates: Array<Delegate>;
  @Output()
  exportNewDelegate = new EventEmitter<any>();
  public toUserID: number;
  public selectedUserInfo: string;
  searchedEmail: string;

  constructor(public authenticationService: AuthenticationService,
              private interFormSvc: InterFormsService, private delegatesSvc: DelegateService,
              private alert: AlertService) {
    this.toUserID = 0;
  }

  users: Array<UserDTO>;
  observableItems: Observable<UserDTO>;
  private searchTermStream$ = new Subject<string>();

  ngOnInit() {
    const self = this;
    self.observableItems = this.delegatesSvc.search(this.searchTermStream$);
    self.delegatesSvc.search(this.searchTermStream$)
      .subscribe(response => this.users = response,
        (error) => {
          self.alert.addAlert('Error when extracting the users list: ' + error.toString(), 'danger');
        });
  }

  search(term: string) {
    if (term.length < 3) {
      return;
    }
    this.searchTermStream$.next(term);
    this.selectedUserInfo = '';
    this.toUserID = 0;
  }

  select(user: UserDTO): void {
    this.toUserID = user.UserID;
    this.searchedEmail = user.EMail;
    this.selectedUserInfo = user.FirstName + '  ' + user.LastName;
    this.users = [];
  }

  callToAddDelegate(): void {
    const self = this;
    if (self.toUserID === 0) {
      self.alert.addAlert('You have to choose a delegate to user!');
      return;
    }
    if (self.existingDelegates.find(d => d.ToUserID === self.toUserID)) {
      self.alert.addAlert('Delegate is already in your list!');
      self.selectedUserInfo = '';
      self.searchedEmail = '';
      self.toUserID = 0;
      return;
    }
    self.alert.addAlertAndRequestAnswer('Do you want to add delegate?', 'warning', 'Add delegate');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      const delegate = <Delegate> {};
      delegate.FromUserID = self.authenticationService.currentUser.UserID;
      delegate.AccessDelegationID = 0;
      delegate.ToUserID = self.toUserID;
      if (delegate.ToUserID === delegate.FromUserID) {
        self.alert.addAlert('Delegate to yourself is superfluous, that is why is not allowed!');
        self.toUserID = 0;
        self.searchedEmail = '';
        return;
      }

      delegate.DateDelegated = moment(new Date()).format('YYYY-MM-DD');
      self.doSave(delegate);

    });
    return;
  }

  doSave(delegate: Delegate) {
    const self = this;
    self.interFormSvc._logger.debug('Create new delegate');
    self.interFormSvc._logger.debug('Delegate JSON for create is:' + JSON.stringify(delegate));
    self.interFormSvc.startSpinner('card', 'Creating delegate ...');
    self.delegatesSvc.createDelegate(delegate).subscribe(data => {
      self.interFormSvc.stopSpinner();
      if (data.statusCode === 'VPA000') {
        delegate.AccessDelegationID = data.newID;
        self.exportNewDelegate.emit(delegate);
        self.toUserID = 0;
        self.searchedEmail = '';
        self.selectedUserInfo = '';
        self.alert.addAlert('Delegate created successfully');
      } else {
        self.alert.addAlert('Error occurred when creating delegate: ' + data.errMessage, 'danger');
      }
    });
    return;
  }

}
