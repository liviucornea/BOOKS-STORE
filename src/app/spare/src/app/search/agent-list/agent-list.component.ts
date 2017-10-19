import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild} from '@angular/core';
import {AgentDTO} from '../../shared/DTO/AgentDTO';
import {SkillDTO} from '../../shared/DTO/SkillDTO';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {SearchService} from '../search.service';
import {AppNotificationsMSG} from '../../shared/configuration/appSettings';
import {AlertService} from '../../shared/services/alert.service';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
  @Input()
  agents: Array<AgentDTO>;
  @Input()
  allSkills: SkillDTO [];
  @Input()
  agentsMassUpdatesList: AgentDTO[];
  @Output()
  sendForMassUpdateList = new EventEmitter<AgentDTO>();
  @ViewChild(PaginationComponent)
  private paginationComponent: PaginationComponent;
  pageAgents: Array<AgentDTO>;
  pageSize: number;
  agentsListOrderBy: string;

  constructor(private interFormSvc: InterFormsService, private alert: AlertService,
              private searchService: SearchService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const self = this;
    self.pageSize = 10;
    if (self.agentsMassUpdatesList && self.agentsMassUpdatesList.length > 0) {
      self.agentsMassUpdatesList.forEach(x => {
        const elm = self.agents.find(agent => agent.cmsLoginId === x.cmsLoginId);
        if (elm) {
          elm.selectForMassUpdate = true;
        }
      })
    }
    self.pageAgents = self.agents.slice(0, self.pageSize);
  }

  toggleEdit(agent: AgentDTO) {
    agent.doEdit = !agent.doEdit;
  }

  getPageAgents(load: any) {
    this.pageAgents = load;
  }

  getAgent(load: any) {
    const actionType = load.action;
    const self = this;
    if (actionType === 'CANCEL') {
      self.pageAgents.find(a => a.cmsLoginId === load.agent.cmsLoginId).doEdit = false;
      return;
    }
    if (actionType === 'UPDATE') {
      self.interFormSvc.startSpinner('card', 'Updating agent profile');
      self.searchService.updateAgent(load.agent).subscribe(data => {
        self.interFormSvc.stopSpinner();
        if (data.statusCode === 'SKS000') {
          self.alert.addAlert(AppNotificationsMSG.saveConfirmedMsg);
        } else {
          self.alert.addAlert('Error occurred when updating agent profile: ' + data.message, 'danger');
        }
        self.pageAgents.find(a => a.cmsLoginId === load.agent.cmsLoginId).doEdit = false;
      })
    }

  }

// a.code.localeCompare(b.code)
  sortAgentsListby(param: string) {
    const self = this;
    // agent ID ascending if not something else
    let sortFunc = (a, b) => a.cmsLoginId.localeCompare(b.cmsLoginId);
    switch (param) {
      case 'agentIdASC':
         self.agentsListOrderBy = 'agentIdDESC';
        break;
      case 'agentIdDESC':
        sortFunc = (a, b) =>  b.cmsLoginId.localeCompare(a.cmsLoginId);
        self.agentsListOrderBy = 'agentIdASC';
        break;
      case 'agentFNameASC':
        sortFunc = (a, b) => a.firstName.localeCompare(b.firstName);
        self.agentsListOrderBy = 'agentFNameDESC';
        break;
      case 'agentFNameDESC':
        sortFunc = (a, b) => b.firstName.localeCompare(a.firstName);
        self.agentsListOrderBy = 'agentFNameASC';
        break;
      case 'agentLNameASC':
        sortFunc = (a, b) => a.lastName.localeCompare(b.lastName);
        self.agentsListOrderBy = 'agentLNameDESC';
        break;
      case 'agentLNameDESC':
        sortFunc = (a, b) => b.lastName.localeCompare(a.lastName);
        self.agentsListOrderBy = 'agentLNameASC';
        break;
    }
    self.agents.sort(sortFunc);
    self.paginationComponent.setPage(1);
  }

  addToMassUpdate(agent: AgentDTO) {
    agent.selectForMassUpdate = !agent.selectForMassUpdate;
    this.sendForMassUpdateList.emit(agent);
  }

}
