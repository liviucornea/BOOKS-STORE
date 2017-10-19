import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserDTO} from '../../shared/DTO/UserDTO';
import {SkillDTO} from '../../shared/DTO/SkillDTO';
import {AdministratorService} from '../services/administrator.service';
import {AlertService} from '../../shared/services/alert.service';
import {AppNotificationsMSG, AppSettings} from '../../shared/configuration/appSettings';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  @Input()
  users: Array<UserDTO>;
  @Input()
  allSkills: Array<SkillDTO>;
  addingNewUser = false;
  @Output()
  sendForMassUpdateList = new EventEmitter<UserDTO>();
  @Input()
  usersMassUpdatesList: UserDTO[];
  newUser: UserDTO;

  constructor(private adminService: AdministratorService, private alert: AlertService, private cd: ChangeDetectorRef,
              private autheticationServ: AuthenticationService, private interFormSvc: InterFormsService) {
  }

  ngOnInit() {
    const self = this;
    if (self.usersMassUpdatesList && self.usersMassUpdatesList.length > 0) {
      self.usersMassUpdatesList.forEach(x => {
        const elm = self.users.find(agent => agent.skillSynkLoginId === x.skillSynkLoginId);
        if (elm) {
          elm.selectForMassUpdate = true;
        }
      })
    }
  }

  toggleEdit(user: UserDTO) {
    user.doEdit = !user.doEdit;
  }

  getUser(load: any) {
    const user = load.user;
    const action = load.action;
    const self = this;
    if (action === 'CANCEL') {
      const index = this.users.indexOf(this.users.find(x => x.adLoginId === user.adLoginId && x.dataSource === user.dataSource));
      if (index !== -1) {
        self.users[index] = user;
        self.cd.markForCheck();
      }
      return;
    }
    if (action === 'DEACTIVATE') {
      self.interFormSvc.startSpinner('card', 'Deactivating user\'s profile...');
      self.adminService.deactivateUser(user).subscribe(data => {
        self.interFormSvc.stopSpinner();
        if (data.statusCode === 'SKS000') {
          const index = this.users.indexOf(this.users.find(x => x.adLoginId === user.adLoginId && x.dataSource === user.dataSource));
          if (index !== -1) {
            self.users.splice(index, 1);
            self.alert.addAlert(AppNotificationsMSG.deactivationConfirmationMsg);
            self.cd.markForCheck();
          }
        } else {
          self.alert.addAlert('Error occurred when deactivating the user: ' + data.message, 'danger')
        }
      });
      return;
    }
    if (user.isNew) {
      self.interFormSvc.startSpinner('card', 'Creating new user profile ...');
      self.adminService.createUser(user).subscribe(data => {
        self.interFormSvc.stopSpinner();
        if (data.statusCode === 'SKS000') {
          user.isNew = false;
          self.users.push(user);
          self.addingNewUser = false;
          self.interFormSvc._logger.warn('New user is successfully created');
          self.alert.addAlert(AppNotificationsMSG.insertMSG);
        } else {
          self.getCancelationNewUser();
          self.interFormSvc._logger.warn('End point response when create user: ' + JSON.stringify(data));
          self.alert.addAlert('Error occurs when creating new user: ' + data.message, 'danger');
        }
        self.cd.markForCheck();
      });
    } else {
      // x.skillSynkLoginId === user.skillSynkLoginId
      self.interFormSvc.startSpinner('card', 'Saving user\'s profile...');
      self.adminService.updateUser(user).subscribe(data => {
        self.interFormSvc.stopSpinner();
        if (data.statusCode === 'SKS000') {
          const index = this.users.indexOf(this.users.find(x => x.adLoginId === user.adLoginId && x.dataSource === user.dataSource));
          if (index !== -1) {
            self.users[index] = user;
            self.alert.addAlert(AppNotificationsMSG.saveConfirmedMsg);
            self.cd.markForCheck();
          }
        } else {
          self.interFormSvc._logger.warn('End point response when saving user: ' + JSON.stringify(data));
          self.alert.addAlert('Error occurred when updating the user: ' + data.message, 'danger')
        }
      });

    }

  }

  getCancelationNewUser() {
    this.addingNewUser = false;
    this.newUser = null;
  }

  addNewUser() {
    this.addingNewUser = !this.addingNewUser;
    if (this.addingNewUser) {
      const userNew = new UserDTO('');
      userNew.isAdministrator = false;
      userNew.dataSource = this.autheticationServ.currentUser.dataSource;
      userNew.isNew = true;
      this.newUser = userNew;
    } else {
      this.newUser = null;
    }
  }
  addToMassUpdate(user: UserDTO) {
    user.selectForMassUpdate = !user.selectForMassUpdate;
    this.sendForMassUpdateList.emit(user);
  }


}
