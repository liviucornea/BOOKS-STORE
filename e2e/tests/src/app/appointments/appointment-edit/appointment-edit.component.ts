import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../shared/domain/Appointment';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentEditService} from '../services/appointment-edit.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {AlertService} from '../../shared/services/alert.service';
import {AppSettings} from '../../shared/configuration/appSettings';

import {InterFormsService} from '../../shared/services/inter-forms.service';
import * as moment from 'moment';
import {UserDTO} from '../../shared/DTO/UserDTO';
import {Approver} from '../../shared/domain/Approver';
import * as _ from 'lodash';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {
  @Input() appointmentIN: Appointment;
  appointment: Appointment;
  jobLevels: Array<any>;
  currentCandidateJobLevels: Array<any>;
  candidateTalentFlg: Array<any>;
  jobIsOptions: Array<any>;
  businessLines: Array<any>;
  replacementReasons: Array<any>;
  LRPSuccessorToJob: Array<any>;
  public allUsers: Array<UserDTO>;
  isAddingNew = false;
  routeAfterAddingNew = false;
  expandZoneA = true;
  expandZoneB = true;
  // this will hide zone B for Approvers from ZoneA which are Guest users
  zoneBisVisible = true;
  readOnly = false;
  copyOfAppointment: string;
  minDate = AppSettings.appMinDate;
  maxDate = AppSettings.appMaxDate;

  constructor(public authenticationService: AuthenticationService, public alert: AlertService,
              private route: ActivatedRoute, private router: Router, private interFormSvc: InterFormsService,
              private appointmentEditService: AppointmentEditService,
              private cd: ChangeDetectorRef) {
    this.appointment = <Appointment> {};
    this.jobLevels = AppSettings.jobLevels;
    this.jobIsOptions = AppSettings.jobIsOptions;
    this.currentCandidateJobLevels = AppSettings.currentCandidateJobLevels;
    this.candidateTalentFlg = AppSettings.candidateTalentFlg;
    this.replacementReasons = AppSettings.replacementReasons;
    this.LRPSuccessorToJob = AppSettings.LRPSuccessorToJob;
  }

  ngOnInit(): void {
    const self = this;
    if (self.authenticationService.authenticated()) {
      // you need to get information for comboboxes...etc when you go to edit/ create new appointment
      if (self.authenticationService.currentUser.BusinessLines && self.authenticationService.currentUser.BusinessLines.length > 0 &&
        self.interFormSvc.allUsers.length > 0) {
        self.getAppointment();
      } else {
        self.interFormSvc.loadBusinessInfo().subscribe(val => {
          self.authenticationService.currentUser.BusinessLines = val[0];
          // self.authenticationService.currentUser.BusinessLines = val;
          self.getAppointment();
        });
      }
    } else {
      self.authenticationService.loadADUserProfile().switchMap(x =>
        self.interFormSvc.loadBusinessInfo())
        .subscribe(val => {
          self.authenticationService.currentUser.BusinessLines = val[0];
          // self.authenticationService.currentUser.BusinessLines = val;
          self.getAppointment();
        });
    }
  }

  getAppointment(apptID?: number): void {
    const self = this;
    let id;
    if (apptID) {
      id = apptID;
    } else {
      id = +self.route.snapshot.paramMap.get('id');
    }
    self.businessLines = self.authenticationService.currentUser.BusinessLines;
    self.allUsers = self.interFormSvc.allUsers;
    self.appointment = <Appointment> {};
    // passing 0 means you create a new appointment
    if (id === 0) {
      self.isAddingNew = true;
      self.appointment.VPAppointmentFormID = 0;
      self.appointment.relationToForm = 'CREATOR';
      self.scaffoldNewAppointment(self.appointment);
      self.copyOfAppointment = JSON.stringify(self.appointment);
      return;
    }
    self.interFormSvc.startSpinner('card', 'Getting appointment details....');
    self.appointmentEditService.getAppointment(id).subscribe(appointment => {
      self.appointment = appointment;
      self.interFormSvc._logger.warn('Appointment JSON from API is : ' + JSON.stringify(appointment));
      self.appointment.Approvals.forEach(approval => {
        approval.intendToReturn = false;
        approval.isVisible = true;
        // temporar
        // check this later as email must come from API
        if (!approval.Email) {
          const user = self.allUsers.find(u => u.UserID === approval.UserID);
          if (user) {
            approval.Email = user.EMail;
          } else {
            //  approval.Email = 'test@test.com';
          }
        }
      });
      self.appointment.ApproversZoneA = self.appointment.Approvals.filter(
        item => item.FormPartIdentifier.toUpperCase() === 'A').sort((a, b) => a.Order - b.Order);
      self.appointment.ApproversZoneB = self.appointment.Approvals.filter(
        item => item.FormPartIdentifier.toUpperCase() === 'B').sort((a, b) => a.Order - b.Order);
      if (appointment.HCCApproval) {
        self.appointment.HCCApproval = moment(appointment.HCCApproval)
          .format('MM-DD-YYYY');
      }
      if (appointment.ApprovalDate) {
        self.appointment.ApprovalDate = moment(appointment.ApprovalDate)
          .format('MM-DD-YYYY');
      }
      if (appointment.AnnouncementDate) {
        self.appointment.AnnouncementDate = moment(appointment.AnnouncementDate)
          .format('MM-DD-YYYY');
      }
      if (appointment.AnnouncementEffectiveDate) {
        self.appointment.AnnouncementEffectiveDate = moment(appointment.AnnouncementEffectiveDate)
          .format('MM-DD-YYYY');
      }
      if (appointment.BaseSalaryApprovalDate) {
        self.appointment.BaseSalaryApprovalDate = moment(appointment.BaseSalaryApprovalDate)
          .format('MM-DD-YYYY');
      }
      self.appointment.Approvals.forEach(a => {
        if (a.ApprovedDate) {
          a.ApprovedDate = moment(a.ApprovedDate).format('MM-DD-YYYY');
        }
      })
      self.setRelationToForm(self.appointment);
      self.copyOfAppointment = JSON.stringify(self.appointment);
      self.interFormSvc._logger.warn('Appointment UI ready: ' + JSON.stringify(appointment));
      self.interFormSvc.stopSpinner();
      self.cd.markForCheck();
    }, (error) => {
      self.interFormSvc.stopSpinner();
      self.router.navigate(['notAuthorized']);
    });
  }

  // bellow method will drive what zone of form to be expanded or collapsed
  // and wht relation is between the user which is loading the form and form itself
  setRelationToForm(appointment: Appointment): void {
    const self = this;
    const thePath = self.route.snapshot.url[0].path;
    const approvalId = +self.route.snapshot.paramMap.get('approvalId');
    if (self.appointment.CreatedByUserID === self.authenticationService.currentUser.UserID) {
      if (!thePath.includes('edit-appointment') && thePath.includes('appointment')
        && approvalId) {
        self.readOnly = true;
        appointment.relationToForm = 'APPROVAL';
        self.interFormSvc.menuOptions.next('APPROVAL');
        self.interFormSvc._logger.warn('Relation to form is : ' + appointment.relationToForm);
        return;
      }
      appointment.relationToForm = 'CREATOR';
      self.readOnly = false;
      self.interFormSvc._logger.warn('Relation to form is : ' + appointment.relationToForm);
      return;
    }
    // if you come to edit the form , get the settings and return
    if (thePath.includes('edit-appointment')) {
      if (self.authenticationService.currentUser.RoleName.toUpperCase() === 'LEADERSHIP') {
        appointment.relationToForm = 'LEADERSHIP';
        self.interFormSvc.menuOptions.next('LEADERSHIP');
        self.readOnly = false;
      } else {
        appointment.relationToForm = 'DELEGATE';
      }
      self.interFormSvc._logger.warn('Relation to form is : ' + appointment.relationToForm);
      return;
    }

    // self.authenticationService.currentUser.RoleName.toUpperCase() === 'LEADERSHIP'
    appointment.relationToForm = 'DELEGATE';
    if (appointment.ApproversZoneA.find(item => item.ApprovalID === approvalId)) {
      self.expandZoneB = false;
      self.readOnly = true;
      appointment.relationToForm = 'APPROVAL';
      self.interFormSvc._logger.warn('Approval zone A found.');
      // here is not only that you collapse it ...but you make it non accessible
      if (self.authenticationService.currentUser.IsGuest) {
        self.interFormSvc._logger.warn('This is a guest user approval in zone A');
        self.zoneBisVisible = false;
        self.interFormSvc.menuOptions.next('NON-APP-USER');
        return;
      }
      self.interFormSvc.menuOptions.next('APPROVAL');
    }
    if (appointment.ApproversZoneB.find(item => item.ApprovalID === approvalId)) {
      self.expandZoneA = false;
      self.readOnly = true;
      appointment.relationToForm = 'APPROVAL';
      self.interFormSvc._logger.warn('Approval zone B found.');
      if (self.authenticationService.currentUser.IsGuest) {
        self.interFormSvc._logger.warn('This is a guest user approval in zone B');
        self.interFormSvc.menuOptions.next('NON-APP-USER');
        return;
      }
      self.interFormSvc.menuOptions.next('APPROVAL');
    }
    self.interFormSvc._logger.warn('Relation to form is : ' + appointment.relationToForm);
    // temporary for testing purpose  you can change these here
    // appointment.relationToForm = 'APPROVAL';
    //  self.readOnly = false;
    // self.interFormSvc.menuOptions.next('NON-APP-USER');
  } // end of setRelationToTheForm

  callToSave(): void {
    const self = this;
    if (self.isAddingNew) {
      self.alert.addAlertAndRequestAnswer('Do you want to save your appointment?', 'warning', 'Create appointment');
    } else {
      self.alert.addAlertAndRequestAnswer('Do you want to save your changes?', 'warning', 'Save appointment');
    }
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      // merge approvals from the 2 sections in single one
      self.prepareForCreateUpdateAPICall(self.appointment);
      if (self.isAddingNew) {
        self.doCreateNewAppointment(self.appointment);
      } else {
        self.doSave(self.appointment);
      }
    });
    return;
  }

  doSave(appointment: Appointment) {
    const self = this;
    self.interFormSvc._logger.debug('Saving appointment on edit form');
    self.interFormSvc._logger.debug('Appointment JSON for Update is:' + JSON.stringify(self.appointment));
    self.interFormSvc.startSpinner('card', 'Updating appointment ...');
    self.appointmentEditService.updateAppointment(appointment).subscribe(data => {
      self.interFormSvc.stopSpinner();
      if (data.statusCode === 'VPA000') {
        appointment.isChanged = false;
        self.getAppointment(appointment.VPAppointmentFormID);
        self.alert.addAlert('Appointment saved successfully');
      } else {
        self.alert.addAlert('Error occurred when saving appointment: ' + data.errMessage, 'danger');
      }
    });
    return;
  }

  doCreateNewAppointment(appointment: Appointment) {
    const self = this;
    self.interFormSvc._logger.debug('Appointment JSON to be created is:' + JSON.stringify(self.appointment));
    appointment.Approvals = appointment.ApproversZoneA.concat(appointment.ApproversZoneB);
    self.interFormSvc.startSpinner('card', 'Creating appointment ...');
    self.appointmentEditService.createAppointment(appointment).subscribe(data => {
      self.interFormSvc.stopSpinner();
      if (data.statusCode === 'VPA000') {
        appointment.isChanged = false;
        self.isAddingNew = false;
        const id = data.newID;
        self.getAppointment(id);
        self.routeAfterAddingNew = true;
        self.router.navigate(['/edit-appointment', id]);
        self.alert.addAlert('Appointment successfully created. Id is: ' + id);
      } else {
        self.alert.addAlert('Error occurred when creating appointment: ' + data.errMessage, 'danger');
      }
    });
    return;
  }

  prepareForCreateUpdateAPICall(appointment: Appointment): void {
    appointment.Approvals = appointment.ApproversZoneA.concat(appointment.ApproversZoneB);
    // put form ID if there were added new records ...
    appointment.Approvals.forEach(item => {
      if (!item.FormID) {
        item.FormID = appointment.VPAppointmentFormID;
      }
      // eventually move this forcing keeping Order to OnChange event for cbo Box ...
      item.Order = AppSettings.approvals.PositionsIdentifier.find(
        x => x.zone === item.FormPartIdentifier && x.description === item.PositionIdentifier).order;
    });
  }

  // add 3 approvals
  scaffoldNewAppointment(appointment: Appointment): void {
    const self = this;
    appointment.Approvals = [];
    appointment.Files = [];
    appointment.AppointmentStatus = 'Pending Job Approval';
    // these just force to none for IE browser...
    appointment.BusinessLineID = '';
    appointment.ReportingToBusinessLine = '';
    appointment.SecondaryToBusinessLine = '';
    appointment.CandidateCurrentBusinessLine = '';
    AppSettings.approvals.PositionsIdentifier.forEach(item => {
      const approval = <Approver> {};
      approval.Order = item.order;
      approval.PositionIdentifier = item.description;
      approval.FormPartIdentifier = item.zone;
      approval.ApprovalID = 0;
      approval.isVisible = true;
      appointment.Approvals.push(approval);
    });
    self.expandZoneA = true;
    self.expandZoneB = true;
    appointment.ApproversZoneA = appointment.Approvals.filter(i => i.FormPartIdentifier === 'A').sort((a, b) => a.Order - b.Order);
    appointment.ApproversZoneB = appointment.Approvals.filter(i => i.FormPartIdentifier === 'B').sort((a, b) => a.Order - b.Order);

  }

  toggleExpandZoneA(): void {
    this.expandZoneA = !this.expandZoneA;
  }

  toggleExpandZoneB(): void {
    this.expandZoneB = !this.expandZoneB;
  }

  navigateToList(): void {
    this.router.navigate(['/appointments']);
  }

  hasChanges(): boolean {
    const self = this;
    if (self.routeAfterAddingNew) {
      self.routeAfterAddingNew = false;
      return false;
    }
    if (this.appointment.VPAppointmentFormID === 0) {
      return true;
    }
    if (this.copyOfAppointment == null) {
      return false;
    }
    const theInitialCopy = <Appointment> JSON.parse(self.copyOfAppointment);
    const theFinalAppointment = <Appointment> JSON.parse(JSON.stringify(self.appointment));
    delete theInitialCopy.Approvals;
    delete theInitialCopy.ApproversZoneA;
    delete theInitialCopy.ApproversZoneB;
    delete theInitialCopy.Files;
    delete theFinalAppointment.Approvals;
    delete theFinalAppointment.ApproversZoneA;
    delete theFinalAppointment.ApproversZoneB;
    delete theFinalAppointment.Files;
    //  if (JSON.stringify(theInitialCopy) !== JSON.stringify(theFinalAppointment)) {
    if (!_.isEqual(theInitialCopy, theFinalAppointment)) {
      return true;
    }
    return false;
  }

  callToCancel(): void {
    const self = this;
    // self.alert.addAlertAndRequestAnswer('Voala...there are changes', 'warning', 'Cancel');
    if (!self.hasChanges()) {
      self.router.navigate(['/appointments']);
      return;
    }
    self.alert.addAlertAndRequestAnswer('Changes not saved.  Click on the Save button to save your changes.', 'warning', 'Cancel');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        self.router.navigate(['/appointments']);
        return;
      }
      // self.getAppointment(self.appointment.VPAppointmentFormID.toString());
    });
    return;
  }

  public numbersOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (!(charCode >= 48 && charCode <= 57)) {
      if (charCode === 9) {
        return;
      }
      event.target.value = '';
      this.alert.addAlert('Only numbers are allowed ', 'danger');
    }
  }
}
