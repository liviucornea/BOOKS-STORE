import {
  ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserDTO} from '../../shared/DTO/UserDTO';
import {AlertService} from '../../shared/services/alert.service';
import {SkillDTO} from '../../shared/DTO/SkillDTO';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit, OnDestroy {
  @Input()
  userInput: UserDTO;
  @Input() gridCols = 4;
  @Input()
  allSkills: SkillDTO [];
  @Output()
  sendUserBack = new EventEmitter();
  @Output()
  sendCancelation = new EventEmitter();
  userInfoLoaded = false;
  user: UserDTO;
  inputUserBackup: UserDTO;
  gridItems: SkillDTO [][];
  private gridValidValues = [1, 2, 3, 4, 6, 12];
  toggleMsg = 'Select All';
  selectAllSkills = false;

  constructor(private alert: AlertService, private authenticationService: AuthenticationService,
              private interFormSvc: InterFormsService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.userInput.isNew) {
      this.user = new UserDTO(this.userInput.adLoginId);
      this.interFormSvc.startSpinner('card', 'Loading user\'s profile...');
      this.loadFullUserProfile(this.userInput);
    } else {
      this.user = JSON.parse(JSON.stringify(this.userInput));
      const skillsAvailable = JSON.parse(JSON.stringify(this.allSkills));
      // add to user all unassigned skills and than make the backup of it
      skillsAvailable.forEach(skill => {
        if (!this.user.skills.find(s => s.code === skill.code)) {
          this.user.skills.push(skill);
        }
      });
      // this.user.skills.sort((a, b) => parseFloat(a.code) - parseFloat(b.code));
      this.inputUserBackup = JSON.parse(JSON.stringify(this.user));
      this.initGrid();
    }
  }

  loadFullUserProfile(user: UserDTO) {
    const self = this;
    self.authenticationService.loadSkillSynchUserProfile(user.adLoginId,
      self.authenticationService.currentUser.dataSource).subscribe(data => {
      if (data) {
        if (data.statusCode === 'SKS000') {
          self.user.firstName = data.firstName;
          self.user.lastName = data.lastName;
          self.user.isAdministrator = data.isAdministrator;
          self.user.message = data.message;
          self.user.skillSynkLoginId = data.skillSynkLoginId;
          self.user.hasAccessToReports = data.hasAccessToReports;
          self.user.dataSource = data.dataSource;
          self.user.skills = data.skills.sort((a, b) => a.code.localeCompare(b.code));
          self.user.skills.forEach(x => {
            x.isSelected = true;
            x.managerId = self.user.skillSynkLoginId;
          });
          const skillsAvailable = JSON.parse(JSON.stringify(this.allSkills));
          // add to user all unassigned skills and than make the backup of it
          skillsAvailable.forEach(skill => {
            if (!self.user.skills.find(s => s.code === skill.code)) {
              skill.isSelected = false;
              self.user.skills.push(skill);
            }
          });
          // this.user.skills.sort((a, b) => parseFloat(a.code) - parseFloat(b.code));
          self.inputUserBackup = JSON.parse(JSON.stringify(this.user));
          self.initGrid();
        } else {
          self.interFormSvc.stopSpinner();
          self.alert.addAlert(data.message + ':' + user.adLoginId, 'danger');
        }
      } else {
        self.interFormSvc.stopSpinner();
        self.alert.addAlert('Error encountered when try to retrieve user profile!', 'danger');
      }
      self.interFormSvc.stopSpinner();
      this.cd.markForCheck();
    });
  }

  private initGrid() {
    this.userInfoLoaded = true;
    // this.gridCols = this.gridCols ? this.gridCols : 0; // cast to int
    this.gridCols = this.gridCols || 1; // ensure min. one row

    if (!this.gridValidValues.find(value => this.gridCols === value)) {
      this.gridCols = 4; // correct invalid input to default col count
    }

    const addition = this.user.skills.length % this.gridCols > 0 ? (this.gridCols - this.user.skills.length % this.gridCols) : 0;
    const rows = (Math.floor(this.user.skills.length / this.gridCols) ? Math.floor(this.user.skills.length / this.gridCols) : 0) + addition;

    this.gridItems = [];

    let index = 0;
    for (let i = 0; i < rows; i++) {
      const row: SkillDTO[] = [];
      for (let j = 0; j < this.gridCols && index < this.user.skills.length + addition; j++) {
        row.push(this.user.skills[index] ? this.user.skills[index] : new SkillDTO());
        index++;
      }

      this.gridItems.push(row);
    }
  }

  doCancellation() {
    if (!this.user.isNew) {
      this.inputUserBackup.doEdit = false;
      this.sendUserBack.emit({'user': this.inputUserBackup, 'action': 'CANCEL'});
    } else {
      this.sendCancelation.emit('cancelled');
    }
  }

  doUserSave() {
    // ask some specific message for deactivating user
    if (!this.user.isActive) {
      this.alert.addAlertAndRequestAnswer('Do you want to deactivate the user?', 'warning', 'User deactivation');
      const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
        this.alert.askConfirmation = false;
        subscription.unsubscribe();
        if (item !== 'OK') {
          return;
        }
        this.user.doEdit = false;
        this.sendUserBack.emit({'user': this.user, 'action': 'DEACTIVATE'});
      });
      return;
    }
    // do a simple user update with adequate message
    if (JSON.stringify(this.user) !== JSON.stringify(this.inputUserBackup)) {
      this.alert.addAlertAndRequestAnswer('Dou you want to apply the changes?', 'warning', 'User updates');
      const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
        this.alert.askConfirmation = false;
        subscription.unsubscribe();
        if (item !== 'OK') {
          return;
        }
        this.user.doEdit = false;
        this.sendUserBack.emit({'user': this.user, 'action': 'SAVE'});
      });
    } else {
      this.alert.addAlert('No changes to be saved');
    }
  }

  toggleSelection() {
    this.selectAllSkills = !this.selectAllSkills;
    if (this.selectAllSkills) {
      this.toggleMsg = 'Unselect All';
      this.user.skills.forEach(x => x.isSelected = true);
    } else {
      this.toggleMsg = 'Select All';
      this.user.skills.forEach(x => x.isSelected = false);
    }

  }

  ngOnDestroy() {
  }

  assingAllSkills(user: UserDTO, isAdmin: boolean) {
    if (isAdmin) {
      user.skills.forEach(skill => skill.isSelected = true);
    }
  }

}
