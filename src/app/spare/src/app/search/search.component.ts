import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AgentDTO} from '../shared/DTO/AgentDTO';
import {AlertService} from '../shared/services/alert.service';
import {SearchService} from './search.service';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {SkillDTO} from '../shared/DTO/SkillDTO';
import {AuthenticationService} from '../shared/services/authentication.service';
import {AppNotificationsMSG, AppSettings} from '../shared/configuration/appSettings';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  agentsList: Array<AgentDTO>;
  dataSources: Array<any>; // = AppSettings.appDataSources;
  allSkillsByUser: SkillDTO [];
  agentIdsToSearch = '';
  firstNamesToSearch = '';
  lastNamesToSearch = '';
  searchPerformed = false;
  dataSource: string;
  agentsMassUpdatesList: Array<AgentDTO> = [];
  doingMassUpdates: boolean;

  constructor(private interFormSvc: InterFormsService, private searchService: SearchService, private alert: AlertService,
              private authenticationService: AuthenticationService, private cd: ChangeDetectorRef) {
    this.agentsList = [];
  }

  ngOnInit() {
    this.dataSources = this.interFormSvc.availableDataSources;
    this.dataSource = this.authenticationService.currentUser.dataSource;
    this.allSkillsByUser = [...this.authenticationService.currentUser.skills].sort((a, b) => parseFloat(a.code) - parseFloat(b.code));
    this.allSkillsByUser.forEach(s => s.levels = AppSettings.skillsLevels);
  }

  doSearch(dataSourceId: string) {
    this.searchPerformed = false;
    this.agentsList = [];
    this.interFormSvc.startSpinner('card', 'Searching for agents...');
    this.searchAgents(this.agentIdsToSearch, this.firstNamesToSearch, this.lastNamesToSearch, dataSourceId);

  }

  searchAgents(agentIdsToSearch: string, firstNames: string, lastNames: string, dataSourceId?: string) {
    const self = this;
    const idsArr = agentIdsToSearch ? agentIdsToSearch.split(/[\s,;]+/) : [];
    const fNmeArray = firstNames ? firstNames.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    const lNmeArray = lastNames ? lastNames.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    self.searchService.loadAgents(dataSourceId).subscribe(data => {
      self.interFormSvc._logger.warn('Agents list received and applying filter for them');
      self.agentsList = data.filter(agent => {
        if (( idsArr.length > 0 ? idsArr.find(x => agent.cmsLoginId === x) : true)
          && (fNmeArray.length > 0 ? fNmeArray.find(x => agent.firstName.toLowerCase().indexOf(x) > -1) : true)
          && (lNmeArray.length > 0 ? lNmeArray.find(x => agent.lastName.toLowerCase().indexOf(x) > -1) : true)) {
          agent.doEdit = false;
          agent.selectForMassUpdate = false;
          return agent;
        }

      });
      self.searchPerformed = true;
      self.interFormSvc.stopSpinner();
    });
  }


  doCancel() {
    this.agentsList = [];
    this.agentIdsToSearch = '';
    this.firstNamesToSearch = '';
    this.lastNamesToSearch = '';
    this.searchPerformed = false;
  }

  interceptEnter(event: any) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (code === 13) {
      this.doSearch(this.dataSource);
    }
  }

  addToMassUpdate(agent: AgentDTO) {
    const self = this;
    if (agent.selectForMassUpdate && self.agentsMassUpdatesList.length === 50) {
      self.alert.addAlert(AppNotificationsMSG.maxUpdatesMaxList, 'danger');
      return;
    }
    if (agent.selectForMassUpdate && !self.agentsMassUpdatesList.find(x => x === agent)) {
      self.agentsMassUpdatesList.push(agent);
    } else if (!agent.selectForMassUpdate) {
      const elm = self.agentsMassUpdatesList.find(x => x.cmsLoginId === agent.cmsLoginId);
      if (elm) {
        self.agentsMassUpdatesList.splice(self.agentsMassUpdatesList.indexOf(elm), 1);
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
      self.agentsMassUpdatesList = [];
      self.doingMassUpdates = false;
      self.doCancel();
      return;
    }
    if (action.type === 'MASS_UPDATE') {
      let theList = new Array<AgentDTO>();
      theList = action.massUpdateList;
      self.interFormSvc._logger.warn('Mass update agents started');
      /*
      const sourceObs = Observable.from(theList)
        .concatMap(agent => {
          self.interFormSvc.startSpinner('card', 'Please wait....updating agent: ' + agent.cmsLoginId);
          return self.searchService.updateAgent(agent);
        }).subscribe(data => {
          if (data.statusCode !== 'SKS000') {
            self.alert.addAlert('Error occurred when updating agent profile: ' + data.message, 'danger');
          }
        }, () => {
        }, () => {
          self.interFormSvc.stopSpinner();
          self.agentsMassUpdatesList = [];
          self.doingMassUpdates = false;
          self.doCancel();
          self.alert.addAlert(AppNotificationsMSG.saveConfirmedMassUpdate);
        });
      */
      // bellow code will do a parallel execution of updating agents in contrast with prior version when it was done
      // sequential ( one at a time)
      const sourceObs = Observable.from(theList).flatMap(agent => {
        self.interFormSvc.startSpinner('card', 'Requests to update ALL your agents have been sent!!! Please wait ....');
        return self.searchService.updateAgent(agent);
      }).subscribe(data => {
        if (data.cmsLoginId) {
          self.interFormSvc.startSpinner('card', 'Agent: ' + data.cmsLoginId + ' already updated....please wait , still working...');
        }
        if (data.statusCode !== 'SKS000') {
          self.alert.addAlert('Error occurred when updating agent\'s profile: ' + data.message, 'danger');
        }
      }, () => {
      }, () => {
        self.interFormSvc.stopSpinner();
        self.agentsMassUpdatesList = [];
        self.doingMassUpdates = false;
        self.doCancel();
        self.alert.addAlert(AppNotificationsMSG.saveConfirmedMassUpdate);
      });


    }
  }

}
