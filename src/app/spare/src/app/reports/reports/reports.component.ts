import {Component, OnInit} from '@angular/core';
import {AppNotificationsMSG} from '../../shared/configuration/appSettings';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AgentForReportDTO} from '../../shared/DTO/AgentforReportDTO';
import {ReportsService} from 'app/reports/reports/reports.service';
import {AlertService} from '../../shared/services/alert.service';
import * as moment from 'moment';
import {Logger} from 'angular2-logger/core';
import * as _ from 'lodash';
import {ExportToExcelService} from '../../shared/services/export-to-excel.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dataSources: Array<any>;
  dataSource: string;
  dateChangedFrom: any;
  dateChangedTo: any;
  timeFrom: any;
  timeTo: any;
  dateTimeFrom: Date;
  dateTimeTo: Date;
  searchPerformed = false;
  changeByIdsToSearch = '';
  agentsIdsToSearch = '';
  skillsToSearch = '';
  skillFilterToPass = [];
  agentsChangeLogList: Array<AgentForReportDTO>;


  constructor(private interFormSvc: InterFormsService, private authenticationService: AuthenticationService,
              private reportsService: ReportsService, private _alert: AlertService, private excelService: ExportToExcelService,
              private _logger: Logger) {
  }

  ngOnInit() {
    this.setDefaults();
    this.dataSource = this.authenticationService.currentUser.dataSource;
    this.dataSources = this.interFormSvc.availableDataSources;
    this._logger.level = this._logger.Level.ERROR;
  }

  runReports() {
    const self = this;
    self.agentsChangeLogList = [];
    const paramsValid = this.validateSearchParams();
    if (paramsValid) {
      self.interFormSvc.startSpinner('card', 'Extracting report info...');
      self.getReportsInfo(moment(self.dateTimeFrom).format('YYYY-MM-DD HH:mm:ss'), moment(self.dateTimeTo).format('YYYY-MM-DD HH:mm:ss'));
    }
  }

  validateSearchParams(): boolean {
    this._logger.warn('Validation parameters started :');
    const self = this;
    const dateFrom = self.dateChangedFrom;
    const timeFrom = self.timeFrom;
    const dateTo = self.dateChangedTo;
    const timeTo = self.timeTo;
    if (dateFrom == null || dateTo == null) {
      self._alert.addAlert('Changed From and Changed To, must be entered!', 'error');
      return false;
    }

    self.dateTimeFrom = new Date(dateFrom.year, dateFrom.month - 1, dateFrom.day, timeFrom.hour, timeFrom.minute);
    self.dateTimeTo = new Date(dateTo.year, dateTo.month - 1, dateTo.day, timeTo.hour, timeTo.minute);
    const startMoment = moment(self.dateTimeFrom);
    const endMoment = moment(self.dateTimeTo);
    const daysDiff = endMoment.diff(startMoment, 'days');
    if (daysDiff > 60) {
      self._alert.addAlert(AppNotificationsMSG.largerSearchPeriod + ' The period you search for is: ' + daysDiff + ' days.', 'error');
      return false;
    }
    if (self.dateTimeFrom > self.dateTimeTo) {
      self._alert.addAlert('Changed to, datetime should be after Changed from datetime!', 'error');
      return false;
    }
    return true;
  }

  getReportsInfo(dtFrom: string, dtTo: string) {
    const self = this;
    const dataSourceId = self.authenticationService.currentUser.dataSource;;
    self.reportsService.loadChangeLog(dtFrom, dtTo, dataSourceId).subscribe(data => {
      self.searchPerformed = true;
      let agentsList = [];
      if (data.statusCode === 'SKS000') {
        agentsList = data.reportLog.map((x) => {
            const agentReport = new AgentForReportDTO(x.agent.cmsLoginId, x.agent.firstName, x.agent.lastName, x.changedDate);
            agentReport.changedBy = x.changedBy;
            agentReport.skills = x.skills;
            return agentReport;
          }
        );
        self.agentsChangeLogList = self.applyFilter(agentsList);
        self.interFormSvc.stopSpinner();
      } else {
        self.agentsChangeLogList = agentsList;
        this._alert.addAlert('Error occurs when extracting change logs report data: ' + data.message, 'danger');
        self.interFormSvc.stopSpinner();
      }

    })
  }

  applyFilter(agentsList: Array<AgentForReportDTO>): Array<AgentForReportDTO> {
    const self = this;
    const startMoment = moment(self.dateTimeFrom);
    const endMoment = moment(self.dateTimeTo);
    const managersIDs = self.changeByIdsToSearch ? self.changeByIdsToSearch.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    const agentsIDs = self.agentsIdsToSearch ? self.agentsIdsToSearch.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    self.skillFilterToPass = self.skillsToSearch ? self.skillsToSearch.split(/\W+/).map(x => x.toLowerCase().trim()) : [];
    let result = agentsList.filter(agent => moment(agent.changedDate).isBetween(startMoment, endMoment));
    result = result.filter(agent => {
      if (agentsIDs.length === 0) {
        return agent;
      } else {
        if (agentsIDs.find(x => agent.cmsLoginId.toLowerCase().indexOf(x) > -1) ||
          agentsIDs.find(x => agent.lastName.toLowerCase().indexOf(x) > -1) ||
          agentsIDs.find(x => agent.firstName.toLowerCase().indexOf(x) > -1)) {
          return agent;
        }
      }
    });
    result = result.filter(agent => {
      if (managersIDs.length === 0) {
        return agent;
      } else {
        if (managersIDs.find(x => agent.changedBy.adLoginId.toLowerCase().indexOf(x) > -1)) {
          return agent;
        }
        if (agent.changedBy.lastName && managersIDs.find(x => agent.changedBy.lastName.toLowerCase().indexOf(x) > -1)) {
          return agent;
        }
        if (agent.changedBy.firstName && managersIDs.find(x => agent.changedBy.firstName.toLowerCase().indexOf(x) > -1)) {
          return agent;
        }
      }
    });
    result = result.filter(agent => {
      if (self.skillFilterToPass.length === 0) {
        return agent;
      } else {
        if (agent.skills.find(skill => {
            if (self.skillFilterToPass.find(e => skill.code.slice(-3).indexOf(e) > -1)) {
              return true;
            }
            if (self.skillFilterToPass.find(e => skill.description.toLowerCase().indexOf(e) > -1)) {
              return true;
            }
            return false;
          })) {
          return agent;
        }
        return false;
      }
    });


    return result;
  }


  doCancelReports() {
    this.searchPerformed = false;
    this.setDefaults();
    this.interFormSvc.stopSpinner();
  }

  setDefaults() {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    this.dateChangedFrom = {
      day: yesterday.getDate(),
      month: yesterday.getMonth() + 1,
      year: yesterday.getFullYear()
    };
    this.dateChangedTo = {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    };
    this.timeFrom = {hour: 0, minute: 0};
    this.timeTo = {hour: 23, minute: 59};
    this.changeByIdsToSearch = '';
    this.agentsIdsToSearch = '';
    this.skillsToSearch = '';
    this.dateTimeFrom = null;
    this.dateTimeTo = null;
  }

  interceptEnter(event: any) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (code === 13) {
      this.runReports();
    }
  }

  onPrintToExcel(inputObj: any) {
    const self = this;
    if (inputObj.type === 'SUMMARY_LIST') {
      const listForService = [];
      const emptyRow = ['', '', ''];
      const reportTitle = ['', '', '', 'Reporting Period:'];
      const reportDates = ['', 'Start Date', moment(self.dateTimeFrom).format('YYYY-MM-DD HH:mm:ss'), '', 'End Date',
        moment(self.dateTimeTo).format('YYYY-MM-DD HH:mm:ss')]
      const columnTitles = ['Agent Name', 'Date Time', 'Changed By', 'Skill', 'From Level', 'To Level', 'Action'];
      listForService.push(reportTitle, reportDates, emptyRow, columnTitles, ...inputObj.excelList);
      this.excelService.createExcelFile(listForService);
    }
  }
}
