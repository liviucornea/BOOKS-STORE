import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {Appointment} from '../../shared/domain/Appointment';
import {Router} from '@angular/router';
import {AppNotificationsMSG, AppSettings} from '../../shared/configuration/appSettings';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AlertService} from '../../shared/services/alert.service';
import {AppointmentsService} from '../services/appointments.service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {AppointmentEditService} from '../services/appointment-edit.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsListComponent implements OnInit {
  @Input()
  appointments: Array<Appointment>;
  @Output()
  exportToExcell = new EventEmitter<any>();
  appointmentStatuses: Array<any>;
  hasItemsForDeletion: boolean;
  appointmentsListOrderBy: string;
  minDate = AppSettings.appMinDate;
  maxDate = AppSettings.appMaxDate;

  constructor(private interFormSvc: InterFormsService, private alert: AlertService,
              private appointmentService: AppointmentsService,
              private appointmentEditService: AppointmentEditService, private cd: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    const self = this;
    this.appointmentStatuses = AppSettings.appointmentStatuses;
    self.appointments.forEach(a => self.makeListAppointment(a));
    self.cd.markForCheck();
  }

  navigateTo(appointmentID: string): void {
    this.router.navigate(['/edit-appointment', appointmentID]);
    // this.router.navigate(['/appointments']);
  }

  makeListAppointment(appointment: Appointment): void {
    const self = this;
    if (appointment.CreateDate) {
      appointment.CreateDate = moment(appointment.CreateDate).format('MM-DD-YYYY HH:mm A');
    }
    appointment.Approvals = _.sortBy(appointment.Approvals, x => x.ApprovalID);
    appointment.Approvals.forEach(a => {
      if (a.ApprovedDate) {
        a.ApprovedDate = moment(a.ApprovedDate).format('MM-DD-YYYY');
      }
    });
    let approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
      x => x.FormPartIdentifier === 'A'
        && x.PositionIdentifier.toUpperCase() === 'VP / SVP HR Business Partner'.toUpperCase())];

    if (approval) {
      appointment.apApproveVPSvpHrDte = approval.ApprovedDate;
    }
    approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
      x => x.FormPartIdentifier === 'A' && x.PositionIdentifier.toUpperCase() === 'SCT')];
    if (approval) {
      appointment.apApproveSCTDte = approval.ApprovedDate;
    }
    approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
      x => x.FormPartIdentifier === 'A' && x.PositionIdentifier.toUpperCase() === 'LEADERSHIP')];
    if (approval) {
      appointment.apApproveLeadershipDte = approval.ApprovedDate;
    }
    approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
      x => x.FormPartIdentifier === 'A' && x.PositionIdentifier.toUpperCase() === 'CEO/CHRO')];
    if (approval) {
      appointment.apApproveCEODte = approval.ApprovedDate;
    }
    approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
      x => x.FormPartIdentifier === 'B' && x.PositionIdentifier.toUpperCase() === 'LEADERSHIP')];
    if (approval) {
      appointment.apCandidateLeadershipDte = approval.ApprovedDate;
    }
    approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
      x => x.FormPartIdentifier === 'B' &&
        x.PositionIdentifier.toUpperCase() === 'VP / SVP HR Business Partner'.toUpperCase())];
    if (approval) {
      appointment.apCandidateHrRmDte = approval.ApprovedDate;
    }

    appointment.expandAppApprovals = false;
    appointment.expandCandidateApproval = false;
    // to be done , get user INfo....
    const creator = self.interFormSvc.allUsers.find(user => user.UserID === appointment.CreatedByUserID);
    if (creator) {
      appointment.creatorName = creator.FirstName + ' ' + creator.LastName;
    }

  }

  toggleExpansion(item: Appointment, zone: string): void {
    switch (zone) {
      // intended to colapse each zone individual but is uggly....so
      // collapse and shrink both ...no need for switch case....
      case 'A': {
        item.expandAppApprovals = !item.expandAppApprovals;
        item.expandCandidateApproval = !item.expandCandidateApproval;
        break;
      }
      case 'C': {
        item.expandCandidateApproval = !item.expandCandidateApproval;
        item.expandAppApprovals = !item.expandAppApprovals;
        break;
      }
      default: {
        break;
      }
    }

  }

  statusChange(appointment: Appointment): void {
    appointment.isChanged = true;
  }

  detectDeletion(checkBox: any, item: Appointment): void {
    if (checkBox.checked) {
      this.hasItemsForDeletion = true;
      return;
    } else {
      item.toBeDeleted = false;
    }
    if (!this.appointments.find(x => x.toBeDeleted)) {
      this.hasItemsForDeletion = false;
    }
  }

  selectUnselectAll(checkBox: any) {
    const self = this;
    if (checkBox.checked) {
      self.hasItemsForDeletion = true;
      self.appointments.forEach(item => item.toBeDeleted = true);
      return;
    } else {
      self.hasItemsForDeletion = false;
      self.appointments.forEach(item => item.toBeDeleted = false);
    }
  }

  callExport(): void {
    const self = this;
    self.interFormSvc._logger.debug('Exporting appointments');
    self.alert.addAlertAndRequestAnswer(`Do you want to export selected appointments?`,
      'warning', 'Export to Excel');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.exportAppointmentsToExcel(self.appointments.filter(x => x.toBeDeleted));
      //  self.alert.addAlert('Still... under construction....');

    });
    return;
  }

  callDeletion(): void {
    const self = this;
    self.interFormSvc._logger.debug('Deleting appointments');
    self.alert.addAlertAndRequestAnswer('Do you want to delete selected appointments?', 'warning', 'Delete appointments');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.doMasDeletion();
    });
    return;
  }

  doMasDeletion(): void {
    const self = this;
    let theList = new Array<Appointment>();
    theList = self.appointments.filter(item => item.toBeDeleted);
    const sourceObs = Observable.from(theList).flatMap(appointmnent => {
      self.interFormSvc.startSpinner('card', 'Requests to delete appointments(s) have been sent!!! Please wait ....');
      return self.appointmentEditService.deleteAppointment(appointmnent.VPAppointmentFormID);
    }).subscribe(data => {
      if (data.statusCode === 'VPA000') {
        self.interFormSvc.startSpinner('card', 'Appointment deleted....please wait , still working...');
      }

    }, () => {
      self.interFormSvc.stopSpinner();
      self.alert.addAlert('An error occurred while doing appointments deletion');
    }, () => {
      theList.forEach(x => {
        _.pull(self.appointments, x);
      });
      self.hasItemsForDeletion = false;
      self.interFormSvc.stopSpinner();
      self.cd.markForCheck();
      self.alert.addAlert(AppNotificationsMSG.saveConfirmedMassDelete);
    });
  }

  callToSave(appointment: Appointment): void {
    const self = this;
    self.interFormSvc._logger.debug('Saving appointment on listing view');
    self.alert.addAlertAndRequestAnswer('Do you want to save appointment changes?', 'warning', 'Saving appointment');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.doSave(appointment);
    });
    return;
  }

  doSave(appointment: Appointment) {
    const self = this;
    self.preSave(appointment);
    self.interFormSvc.startSpinner('card', 'Saving appointment ...');
    self.appointmentEditService.updateAppointment(appointment).subscribe(data => {
      self.interFormSvc.stopSpinner();
      if (data.statusCode === 'VPA000') {
        appointment.isChanged = false;
        self.cd.markForCheck();
        self.alert.addAlert('Appointment saved successfully');
      } else {
        self.alert.addAlert('Error occurred when saving appointment: ' + data.errMessage, 'danger');
      }
    });
    return;

  }

  preSave(appointment: Appointment): void {
    if (appointment.apApproveVPSvpHrDte) {
      const approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
        x => x.FormPartIdentifier === 'A' &&
          x.PositionIdentifier.toUpperCase() === 'VP / SVP HR Business Partner'.toUpperCase())];
      if (approval) {
        approval.ApprovedDate = appointment.apApproveVPSvpHrDte;
      }
    }
    if (appointment.apApproveSCTDte) {
      const approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
        x => x.FormPartIdentifier === 'A' && x.PositionIdentifier.toUpperCase() === 'SCT')];
      if (approval) {
        approval.ApprovedDate = appointment.apApproveSCTDte;
      }
    }
    if (appointment.apApproveLeadershipDte) {
      const approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
        x => x.FormPartIdentifier === 'A' && x.PositionIdentifier.toUpperCase() === 'LEADERSHIP')];
      if (approval) {
        approval.ApprovedDate = appointment.apApproveLeadershipDte;
      }
    }
    if (appointment.apApproveCEODte) {
      const approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
        x => x.FormPartIdentifier === 'A' && x.PositionIdentifier.toUpperCase() === 'CEO/CHRO')];
      if (approval) {
        approval.ApprovedDate = appointment.apApproveCEODte;
      }
    }
    if (appointment.apCandidateHrRmDte) {
      const approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
        x => x.FormPartIdentifier === 'B' &&
          x.PositionIdentifier.toUpperCase() === 'VP / SVP HR Business Partner'.toUpperCase())];
      if (approval) {
        approval.ApprovedDate = appointment.apCandidateHrRmDte;
      }
    }
    if (appointment.apCandidateLeadershipDte) {
      const approval = appointment.Approvals[_.findLastIndex(appointment.Approvals,
        x => x.FormPartIdentifier === 'B' && x.PositionIdentifier.toUpperCase() === 'LEADERSHIP')];
      if (approval) {
        approval.ApprovedDate = appointment.apCandidateLeadershipDte;
      }
    }
  }

  sortAppointmentsListby(param: string) {
    const self = this;
    // JobTitle
    let sortFunc = (a, b) => a.CreateDate.localeCompare(b.CreateDate);
    switch (param) {
      case 'CreateDateASC':
        self.appointmentsListOrderBy = 'CreateDateDESC';
        break;
      case 'CreateDateDESC':
        sortFunc = (a, b) => b.CreateDate.localeCompare(a.CreateDate);
        self.appointmentsListOrderBy = 'CreateDateASC';
        break;
      case 'JobTitleASC':
        sortFunc = (a, b) => a.JobTitle ? a.JobTitle.localeCompare(b.JobTitle) : -1;
        self.appointmentsListOrderBy = 'JobTitleDESC';
        break;
      case 'JobTitleDESC':
        sortFunc = (a, b) => b.JobTitle ? b.JobTitle.localeCompare(a.JobTitle) : -1;
        self.appointmentsListOrderBy = 'JobTitleASC';
        break;
      case 'AppointmentStatusASC':
        sortFunc = (a, b) => AppSettings.appointmentStatuses.findIndex(item => item.description === b.AppointmentStatus) -
          AppSettings.appointmentStatuses.findIndex(item => item.description === a.AppointmentStatus);
        self.appointmentsListOrderBy = 'AppointmentStatusDESC';
        break;
      case 'AppointmentStatusDESC':
        sortFunc = (a, b) => AppSettings.appointmentStatuses.findIndex(item => item.description === a.AppointmentStatus) -
          AppSettings.appointmentStatuses.findIndex(item => item.description === b.AppointmentStatus);
        self.appointmentsListOrderBy = 'AppointmentStatusASC';
        break;
      //  CandidateNameASC
      case 'CandidateNameASC':
        sortFunc = (a, b) => {
          if (a.CandidateFirstName + a.CandidateLastName) {
            return (a.CandidateFirstName + a.CandidateLastName).localeCompare(b.CandidateFirstName + b.CandidateLastName);
          } else {
            return -1;
          }
        };
        self.appointmentsListOrderBy = 'CandidateNameDESC';
        break;
      case 'CandidateNameDESC':
        sortFunc = (a, b) => {
          if (b.CandidateFirstName + b.CandidateLastName) {
            return (b.CandidateFirstName + b.CandidateLastName).localeCompare(a.CandidateFirstName + a.CandidateLastName);
          } else {
            return -1;
          }
        }
        self.appointmentsListOrderBy = 'CandidateNameASC';
        break;

    }
    const completeAppointments = self.appointments.filter(item => {
      if (item.AppointmentStatus) {
        return item.AppointmentStatus.toUpperCase() === 'APPROVED EFFECTIVE';
      } else {
        return false;
      }
    });
    self.appointments = self.appointments.sort(sortFunc);
    // self.appointments = self.appointments.concat(completeAppointments);
  }

  exportAppointmentsToExcel(list: Appointment []) {
    const listOfRecords = [];
    list.forEach(appointment => {
      listOfRecords.push([appointment.VPAppointmentFormID, appointment.AppointmentStatus, appointment.JobTitle,
        appointment.CandidateFirstName, appointment.CandidateLastName,
      ]);
    });
    this.exportToExcell.emit({'type': 'APPOINTMENTS_LIST', 'appointmentsList': list, 'excelList': listOfRecords});
  }
}
