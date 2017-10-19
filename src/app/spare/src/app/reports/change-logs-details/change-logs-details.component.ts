import {Component, Input, OnInit} from '@angular/core';
import {AgentForReportDTO} from '../../shared/DTO/AgentforReportDTO';
import * as _ from 'lodash';

@Component({
  selector: 'app-change-logs-details',
  templateUrl: './change-logs-details.component.html',
  styleUrls: ['./change-logs-details.component.scss']
})
export class ChangeLogsDetailsComponent implements OnInit {

  @Input()
  agent: AgentForReportDTO;
  changedBy: string;

  constructor() {
  }

  ngOnInit() {
    this.makeAgentUiReady(this.agent);
  }

  makeAgentUiReady(agent: AgentForReportDTO) {
    this.changedBy = agent.changedBy.adLoginId.trim().toUpperCase() === 'BATCH' ? agent.changedBy.adLoginId.toUpperCase() :
      agent.changedBy.firstName + ' ' + agent.changedBy.lastName;
    agent.skills.forEach(skill => {
      if (!skill.fromLevel) {
        skill.reportStatus = 'added';
      }
      if (!skill.toLevel) {
        skill.reportStatus = 'deleted';
      }
      if (skill.toLevel && skill.fromLevel) {
        skill.reportStatus = 'changed';
      }
    })


  }

}
