import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SkillDTO} from '../../shared/DTO/SkillDTO';
import {UserDTO} from '../../shared/DTO/UserDTO';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-users-mass-update',
  templateUrl: './users-mass-update.component.html',
  styleUrls: ['./users-mass-update.component.scss']
})
export class UsersMassUpdateComponent implements OnInit {
  @Input()
  adminSkills: SkillDTO[];
  @Input()
  usersMassUpdatesList: UserDTO[];
  skills: SkillDTO[];
  showUsersList = false;
  isAdministrator = false;
  hasAccessToReports = false;
  @Output()
  sendMassUpdateAction = new EventEmitter<any>();

  constructor(private alert: AlertService) {
  }

  ngOnInit() {
    const self = this;
    this.skills = JSON.parse(JSON.stringify(self.adminSkills));
  }

  toggleAgentsList() {
    this.showUsersList = !this.showUsersList;
  }

  doCancellation() {
    const self = this;
    self.alert.addAlertAndRequestAnswer('This will clear mass update list. Do you want to do that?', 'warning', 'Cancel mass update');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.sendMassUpdateAction.emit({'type': 'CANCEL'});
    });
  }

  applyMassSkills() {
    const self = this;
    self.alert.addAlertAndRequestAnswer('Do you want to run mass update users?', 'warning', 'Users mass update');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      if (self.validateEntries()) {
        self.sendMassUpdateList();
      }
    });

  }

  validateEntries() {
    const self = this;
    const theseSkills = self.skills.filter(skill => skill.isSelected);
    const theseUsers = self.usersMassUpdatesList.filter(agent => agent.selectForMassUpdate);
    if (theseSkills.length === 0 && !self.isAdministrator) {
      self.alert.addAlert('At least one skill must be selected!', 'error');
      return false;
    }
    if (theseUsers.length === 0) {
      self.alert.addAlert('At least one User must be selected!', 'error');
      return false;
    }
    theseUsers.forEach(user => {user.isAdministrator = self.isAdministrator;
    user.hasAccessToReports = self.hasAccessToReports});
    self.usersMassUpdatesList = theseUsers;
    self.skills = theseSkills;
    return true;
  }

  sendMassUpdateList() {
    const self = this;
    const theList = new Array<UserDTO>();
    self.usersMassUpdatesList.forEach(x => {
      x.skills = self.skills;
      theList.push(x);
    })
    this.sendMassUpdateAction.emit({'type': 'MASS_UPDATE', 'massUpdateList': theList});
  }

}
