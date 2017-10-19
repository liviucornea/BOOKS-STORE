import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {AgentForReportDTO} from '../../shared/DTO/AgentforReportDTO';
import * as moment from 'moment';
import {SkillAgentForReportDTO} from '../../shared/DTO/SkillAgentForReportDTO';
import * as _ from 'lodash';
import {InterFormsService} from '../../shared/services/inter-forms.service';

@Component({
  selector: 'app-change-logs-reports',
  templateUrl: './change-logs-reports.component.html',
  styleUrls: ['./change-logs-reports.component.scss']
})
export class ChangeLogsReportsComponent implements OnInit {
  whatToShow = 'summary'; // this can be summary or details
  summaryListSkills: SkillAgentForReportDTO [];
  @Input()
  agentsList: AgentForReportDTO [];
  @Input()
  skillFilterToPass: Array<string>;
  @Output()
  exportToExcell = new EventEmitter<any>();

  constructor(private interFormService: InterFormsService, private cd: ChangeDetectorRef) {
    const now = moment(); // add this 2 of 4
    console.log('Using moment, date format is: ', now.format()); // add this 3 of 4
  }

  ngOnInit() {
    this.summaryListSkills = [];
    this.makeAgentsUiReady(this.agentsList);
  }

  show(showThis: string) {
    this.whatToShow = showThis;
  }

  makeAgentsUiReady(agents: AgentForReportDTO []) {
    agents.forEach(x => {
      x.changedDate = moment(x.changedDate).format('YYYY-MM-DD HH:mm A');
      x.skills.forEach(skill => skill.agentId = x.id);
      this.addToSummaryList(x);
    });
    this.interFormService._logger.warn('Agents from list are UI ready!');
  }

  addToSummaryList(agent: AgentForReportDTO) {
    // add to summary list all skills from agent current skills ( those can be : new added, changed, deleted)
    this.interFormService._logger.warn('Add to summary list, agent current skills.');
    agent.skills.forEach((s) => {
      const skillForList = <SkillAgentForReportDTO> _.clone(s);
      skillForList.changedDate = agent.changedDate;
      skillForList.changedBy = agent.changedBy.adLoginId.trim().toUpperCase() === 'BATCH' ? agent.changedBy.adLoginId.trim().toUpperCase() :
        agent.changedBy.firstName + ' ' + agent.changedBy.lastName;
      if (!skillForList.fromLevel) {
        skillForList.reportStatus = 'added';
      }
      if (!skillForList.toLevel) {
        skillForList.reportStatus = 'deleted';
      }
      if (skillForList.toLevel && skillForList.fromLevel) {
        skillForList.reportStatus = 'changed';
      }
      skillForList.agentName = agent.firstName + ' ' + agent.lastName;
      //  if there is a filter for specific skills add just those to summary
      if (this.skillFilterToPass.length > 0) {
        if (this.skillFilterToPass.find(e => skillForList.code.slice(-3).indexOf(e) > -1) ||
          this.skillFilterToPass.find(e => skillForList.description.toLowerCase().indexOf(e) > -1)) {
          this.summaryListSkills.push(skillForList);
        }
      } else {
        this.summaryListSkills.push(skillForList);
      }
    })
  }

  exportSummaryToExcel(list: SkillAgentForReportDTO []) {
    const listOfRecords = [];
    list.forEach(skill => {
      listOfRecords.push([skill.agentName, skill.changedDate, skill.changedBy,
        skill.description, skill.fromLevel, skill.toLevel, skill.reportStatus])
    });

    this.exportToExcell.emit({'type': 'SUMMARY_LIST', 'excelList': listOfRecords});
  }

}
