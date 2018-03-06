import {Component, OnInit} from '@angular/core';
import {AppointmentsService} from './services/appointments.service';
import {Appointment} from '../shared/domain/Appointment';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {ExportToExcelService} from '../shared/services/export-to-excel.service';
import {AlertService} from '../shared/services/alert.service';
import {saveAs as importedSaveAs} from 'file-saver';
import {AppNotificationsMSG, AppSettings} from '../shared/configuration/appSettings';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointmentsList: Appointment [];

  constructor(public authenticationService: AuthenticationService, private alert: AlertService,
              private interformSvc: InterFormsService, private excelService: ExportToExcelService,
              private appointmentService: AppointmentsService, private router: Router) {
  }

  ngOnInit() {
    const self = this;
    self.appointmentsList = [];
    self.interformSvc.startSpinner('card', AppNotificationsMSG.loadingAppointments);
    if (self.authenticationService.authenticated()) {
      self.interformSvc.loadBusinessInfo().switchMap
      (x => self.appointmentService.loadAppointments())
        .subscribe(data => {
          self.appointmentsList = data;
        });
    } else {
      self.authenticationService.loadADUserProfile().switchMap
      (resp => self.interformSvc.loadBusinessInfo()).switchMap
      (businessInfo => self.appointmentService.loadAppointments()).subscribe(data => {
        self.appointmentsList = data;
      });
    }
  }

  newAppointment(): void {
    this.router.navigate(['/appointment', 0]);
  }

  onPrintToExcel(inputObj: any) {
    const self = this;
    if (inputObj.type === 'APPOINTMENTS_LIST') {
      const listForService = [];
      const emptyRow = ['', '', ''];
      const reportTitle = ['', '', '', 'Appointments List:'];
      listForService.push(reportTitle, emptyRow);
      const columnTitles = ['Appointment Id:', 'Appointment Status', 'Job Title', 'Candidate First Name',
        'Candidate Last Name', 'Created By'];
      const appointmentsExcelList = inputObj.appointmentsList;
      appointmentsExcelList.forEach(item => {
        listForService.push(['Appointment Id:', item.VPAppointmentFormID, '', 'Appointment Status', item.AppointmentStatus,
          'Job Title', item.JobTitle, 'Candidate First Name', item.CandidateFirstName,
          'Candidate First Name', item.CandidateLastName,
          'Created By:', item.creatorName]);
        listForService.push(emptyRow);
      });
     // this.excelService.createExcelFile(listForService);
      self.getExportlink(appointmentsExcelList.map(item => item.VPAppointmentFormID));
    }
  }

  getExportlink(formsIds: Array<number>): void {
    const self = this;
    self.interformSvc.startSpinner('card', 'Export to excel is running...');
    self.appointmentService.requestExport(formsIds).subscribe(data => {
      if (data.statusCode === 'VPA000') {
        self.interformSvc._logger.warn('Api response for export link is: ' + data.packageData);
        self.downloadExcelFile(data.packageData);
      }else {
        self.interformSvc.stopSpinner();
        self.alert.addAlert('Error when getting export link for excel file:' + data.errMessage +
        ' Error code is:' + data.statusCode);
     }

    }, () => {
      self.interformSvc.stopSpinner();
      self.alert.addAlert('An error occurred while exporting to excel', 'error');
    });
  }

  downloadExcelFile(exportLink: string): void {
    const self = this;
    self.interformSvc.startSpinner('card', 'Start to download excel file....');
    self.appointmentService.downloadExcelFile(exportLink)
      .subscribe(data => {
          self.interformSvc._logger.warn('Valid response received when file is downloaded!');
          importedSaveAs(data, AppSettings.reportExcelFileNAme);
          self.interformSvc.stopSpinner();
        },
        error => {
          console.log('Error downloading the file.' + error.toString());
          self.interformSvc.stopSpinner();
        }
        ,
        () => console.log('Completed excel file download.'));
  }

}
