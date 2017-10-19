import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {AdministratorService} from './services/administrator.service';
import {UserDTO} from '../shared/DTO/UserDTO';
import {SkillDTO} from '../shared/DTO/SkillDTO';
import {AuthenticationService} from '../shared/services/authentication.service';
import {AppNotificationsMSG} from '../shared/configuration/appSettings';
import {AlertService} from '../shared/services/alert.service';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit, OnDestroy {
  usersList: Array<UserDTO>;
  allSkills: Array<SkillDTO>;
  dataSources: Array<any>;
  skillSynkIdsToSearch: string;
  firstNamesToSearch: string;
  lastNamesToSearch: string;
  searchPerformed = false;
  dataSource: string;
  usersMassUpdatesList: Array<UserDTO> = [];
  doingMassUpdates: boolean;

  constructor(private interFormSvc: InterFormsService, private adminService: AdministratorService,
              private authenticationService: AuthenticationService, private alert: AlertService, private cd: ChangeDetectorRef) {
    this.usersList = [];
  }

  ngOnInit() {
    this.dataSources = this.interFormSvc.availableDataSources;
    this.allSkills = this.authenticationService.currentUser.skills;
    this.dataSource = this.authenticationService.currentUser.dataSource;
    // this.allSkills.sort((a, b) => a.code.localeCompare(b.code));
  }

  doSearch(dataSource: string) {
    this.usersList = [];
    this.interFormSvc.startSpinner('card', 'Searching for users...');
    this.searchUsers(this.skillSynkIdsToSearch, this.firstNamesToSearch, this.lastNamesToSearch, dataSource);
  }

  searchUsers(skillSynkIdsToSearch: string, firstNames: string, lastNames: string, dataSourceId: string) {
    const idsArr = skillSynkIdsToSearch ? skillSynkIdsToSearch.split(/[\s,;]+/) : [];
    const fNmeArray = firstNames ? firstNames.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    const lNmeArray = lastNames ? lastNames.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    const self = this;
    self.adminService.loadUsers(dataSourceId).subscribe(data => {
      self.usersList = data.filter(user => {
        if (( idsArr.length > 0 ? idsArr.find(x => user.skillSynkLoginId === x) : true)
          && (fNmeArray.length > 0 ? fNmeArray.find(x => user.firstName.toLowerCase().indexOf(x) > -1) : true)
          && (lNmeArray.length > 0 ? lNmeArray.find(x => user.lastName.toLowerCase().indexOf(x) > -1) : true)) {
          return user;
        }

      });
      self.searchPerformed = true;
      self.interFormSvc.stopSpinner();
    });
  }

  doCancel() {
    this.usersList = [];
    this.skillSynkIdsToSearch = '';
    this.firstNamesToSearch = '';
    this.lastNamesToSearch = '';
    this.searchPerformed = false;
  }

  ngOnDestroy() {
    this.interFormSvc.stopSpinner();
  }

  interceptEnter(event: any) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (code === 13) {
      this.doSearch(this.dataSource);
    }
  }

  addToMassUpdate(user: UserDTO) {
    const self = this;
    if (user.selectForMassUpdate && self.usersMassUpdatesList.length === 20) {
      self.alert.addAlert(AppNotificationsMSG.maxUpdatesMaxUsersList, 'danger');
      return;
    }
    if (user.selectForMassUpdate && !self.usersMassUpdatesList.find(x => x === user)) {
      self.usersMassUpdatesList.push(user);
    } else if (!user.selectForMassUpdate) {
      const elm = self.usersMassUpdatesList.find(x => x.skillSynkLoginId === user.skillSynkLoginId);
      if (elm) {
        self.usersMassUpdatesList.splice(self.usersMassUpdatesList.indexOf(elm), 1);
      }
    }
    self.cd.markForCheck();
  }

  toggleMassUpdates() {
    this.doingMassUpdates = !this.doingMassUpdates;
  }

  getMassUpdateAction(action: any) {
    const self = this;
    if (action.type === 'CANCEL') {
      self.usersMassUpdatesList = [];
      self.doingMassUpdates = false;
      self.doCancel();
      return;
    }
    if (action.type === 'MASS_UPDATE') {
      let theList = new Array<UserDTO>();
      theList = action.massUpdateList;
      self.interFormSvc._logger.warn('Mass update agents started');
      // bellow code will do a parallel execution of updating users

      const sourceObs = Observable.from(theList).flatMap(user => {
        self.interFormSvc.startSpinner('card', 'Requests to update ALL your users have been sent!!! Please wait ....');
        return self.adminService.updateUser(user);
      }).subscribe(data => {
        if (data.skillSynkLoginId) {
          self.interFormSvc.startSpinner('card', 'User: ' + data.skillSynkLoginId + ' already updated....please wait , still working...');
        }
        if (data.statusCode !== 'SKS000') {
          self.alert.addAlert('Error occurred when updating user\'s profile: ' + data.message, 'danger');
        }
      }, () => {
      }, () => {
        self.interFormSvc.stopSpinner();
        self.usersMassUpdatesList = [];
        self.doingMassUpdates = false;
        self.doCancel();
        self.alert.addAlert(AppNotificationsMSG.saveConfirmedMassUpdate);
      });


    }
  }
}
