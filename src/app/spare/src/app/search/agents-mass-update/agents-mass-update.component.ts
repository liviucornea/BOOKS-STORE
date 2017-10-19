import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SkillDTO} from '../../shared/DTO/SkillDTO';
import {AgentDTO} from '../../shared/DTO/AgentDTO';
import {SkillAgentDTO} from '../../shared/DTO/SkillAgentDTO';
import {AppSettings} from '../../shared/configuration/appSettings';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-agents-mass-update',
  templateUrl: './agents-mass-update.component.html',
  styleUrls: ['./agents-mass-update.component.scss']
})
export class AgentsMassUpdateComponent implements OnInit {

  @Input()
  skills: SkillDTO[];
  @Input()
  agentsMassUpdatesList: AgentDTO[];
  @Output()
  sendMassUpdateAction = new EventEmitter<any>();
  showAgentsList = false;
  massUpdateSkills = new Array<SkillAgentDTO>();

  constructor(private alert: AlertService) {
  }

  ngOnInit() {
    const self = this;
    self.skills.forEach(s => {
      const msUpSkill = new SkillAgentDTO();
      msUpSkill.code = s.code;
      msUpSkill.description = s.description;
      msUpSkill.isSelected = false;
      msUpSkill.levels = AppSettings.skillsLevels;
      msUpSkill.level = '1';
      self.massUpdateSkills.push(msUpSkill)
    })
  }

  toggleAgentsList() {
    this.showAgentsList = !this.showAgentsList;
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
    self.alert.addAlertAndRequestAnswer('Do you want to run mass update agents?', 'warning', 'Agents mass update');
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
    const theseSkills = self.massUpdateSkills.filter(skill => skill.isSelected);
    const theseAgents = self.agentsMassUpdatesList.filter(agent => agent.selectForMassUpdate);
    if (theseSkills.length === 0) {
      self.alert.addAlert('At least one skill must be selected!', 'error');
      return false;
    }
    if (theseAgents.length === 0) {
      self.alert.addAlert('At least one agent must be selected!', 'error');
      return false;
    }
    self.agentsMassUpdatesList = theseAgents;
    self.massUpdateSkills = theseSkills;
    return true;
  }

  sendMassUpdateList() {
    const self = this;
    const theList = new Array<AgentDTO>();
    self.agentsMassUpdatesList.forEach(x => {
      x.skills = self.massUpdateSkills;
      theList.push(x);
    })
    this.sendMassUpdateAction.emit({'type': 'MASS_UPDATE', 'massUpdateList': theList});
  }

}
