import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {AgentDTO} from '../../shared/DTO/AgentDTO';
import * as _ from 'lodash';
import {SkillAgentDTO} from '../../shared/DTO/SkillAgentDTO';
import {SkillDTO} from '../../shared/DTO/SkillDTO';
import {SearchService} from '../search.service';
import {AppSettings} from '../../shared/configuration/appSettings';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentEditComponent implements OnInit {

  @Input()
  agentInput: AgentDTO;
  agent: AgentDTO;
  @Input()
  allSkills: SkillDTO [];
  @Output()
  sendAgentBack = new EventEmitter();
  unassignedToAgentSkills: SkillAgentDTO [] ;
  isAddingNewSkills = false;
  agentInfoLoaded = false;
  noMoreSkills: string;
  constructor(private searchService: SearchService, private alert: AlertService,
              private interFormSvc: InterFormsService, private cd: ChangeDetectorRef) {
  }

  addingNewSkills() {
    this.isAddingNewSkills = true;
  }

  applySkillsChanges() {
    this.alert.addAlertAndRequestAnswer('Do you want to save changes for agent?', 'warning', 'Update agent');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      this.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      this.sendAgentBack.emit({'agent': this.agent, 'action': 'UPDATE'});
    });

  }

  doCancel() {
    this.sendAgentBack.emit({'agent': this.agent, 'action': 'CANCEL'});
  }

  assignSkill(skill: SkillAgentDTO) {
    const skillForAgent = skill;
    skillForAgent.isSelected = true;
    this.agent.skills.push(skillForAgent);
    _.remove(this.unassignedToAgentSkills, skill);
  }

  unassignSkill(skill: SkillAgentDTO) {
    const skillUnassigned = <SkillDTO> skill;
    skillUnassigned.isSelected = false;
    this.unassignedToAgentSkills.push(skillUnassigned);
    _.remove(this.agent.skills, skill);
  }


  ngOnInit() {
    this.loadAgent(this.agentInput);
    this.noMoreSkills = AppSettings.noSkillsAvailable;
    this.unassignedToAgentSkills = [];
  }

  loadAgent(agentInput: AgentDTO) {
    const self = this;
    this.interFormSvc.startSpinner('card', 'Load agent skills');
    self.searchService.loadAgentInfo(agentInput).subscribe(data => {
      if (data) {
        if (data.statusCode === 'SKS000') {
          self.agent = new AgentDTO(agentInput.cmsLoginId, agentInput.adLoginId, agentInput.firstName, agentInput.lastName);
          self.agent.userLoginId = agentInput.userLoginId;
          self.agent.dataSourceId = agentInput.dataSourceId;
          self.agent.skills = [...data.skills].sort((a, b) => parseFloat(a.code) - parseFloat(b.code));
          self.agent.skills.forEach(x => {
            if (self.allSkills.find(y => y.code === x.code)) {
              x.nonEditable = false;
            } else {
              x.nonEditable = true;
            }
            x.levels = AppSettings.skillsLevels;
          });
          self.allSkills.forEach(x => {
            if (!self.agent.skills.find(y => y.code === x.code)) {
              const s = <SkillAgentDTO> x;
              s.level = '1';
              this.unassignedToAgentSkills.push(s);
            }
          });
          self.unassignedToAgentSkills.sort((a, b) => parseFloat(a.code) - parseFloat(b.code));
          this.interFormSvc.stopSpinner();
        } else {
          this.interFormSvc.stopSpinner();
          self.agentInput.doEdit = false;
          self.alert.addAlert(data.message, 'danger');
        }
      } else {
        this.interFormSvc.stopSpinner();
        self.agentInput.doEdit = false;
        self.alert.addAlert('Error encountered when try to retrieve user profile!', 'danger');
      }
      self.agentInfoLoaded = true;
      self.cd.markForCheck();
    })
  }


}
