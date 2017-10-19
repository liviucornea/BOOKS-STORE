import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import {reportstRouting} from './reports.routs';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ChangeLogsReportsComponent } from './change-logs-reports/change-logs-reports.component';
import {ReportsService} from './reports/reports.service';
import { ChangeLogsDetailsComponent } from './change-logs-details/change-logs-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Logger} from 'angular2-logger/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    reportstRouting
  ],
  declarations: [ReportsComponent, ChangeLogsReportsComponent, ChangeLogsDetailsComponent],
  providers: [ReportsService, Logger],
  exports: [ReportsComponent]
})
export class ReportsModule { }
