import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Approver} from '../../shared/domain/Approver';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AlertService} from '../../shared/services/alert.service';
import * as _ from 'lodash';
import {AppSettings} from '../../shared/configuration/appSettings';
import {UserDTO} from '../../shared/DTO/UserDTO';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {AppointmentEditService} from '../services/appointment-edit.service';
import {NotificationInputApi} from '../../shared/domain/NotificationInput';
import {Appointment} from '../../shared/domain/Appointment';
import {ApprovalInput} from '../../shared/domain/ApprovalInput';
import {ActivatedRoute} from '@angular/router';
import {ApproversService} from "./approvers.service";
import {Subject} from "rxjs/Subject";
import {IUser} from "../../shared/domain/IUser";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-approvers',
  templateUrl: './approvers.component.html',
  styleUrls: ['./approvers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproversComponent implements OnInit, OnDestroy {
  @Input() approvals: Array<Approver>;
  @Input() zone: string;
  @Input() relationToForm: string;
  @Input() appointment: Appointment;
  approvalPositions: Array<any>;
  allUsers: Array<UserDTO>;
  private searchTermStream$ = new Subject<any>();
  private subscription: Subscription;

  constructor(private interFormSvc: InterFormsService, public authenticationService: AuthenticationService,
              private appointmentEditService: AppointmentEditService, private route: ActivatedRoute,
              private alert: AlertService, private cd: ChangeDetectorRef,
              private approversService: ApproversService) {
  }

  ngOnInit() {
    const self = this;
    self.approvalPositions = AppSettings.approvals.
    PositionsIdentifier.filter(item => item.zone === self.zone && item.description.toUpperCase() !== 'CEO/CHRO');
    self.makeUIReady();
    // self.cd.markForCheck();
    self.subscription = self.approversService.search(this.searchTermStream$)
      .subscribe(response => {
          // self.interFormSvc.stopSpinner();
          self.cd.markForCheck();
        },
        (error) => {
          //  self.interFormSvc.stopSpinner();
          self.alert.addAlert('Error when extracting the approvers list: ' + error.toString(), 'danger');
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  makeUIReady(): void {
    const self = this;
    if (self.relationToForm !== 'APPROVAL') {
      return;
    }
    const approvalId = +self.route.snapshot.paramMap.get('approvalId');
    self.approvals.forEach(a => {
      if (a.ApprovalID === approvalId) {
        a.isVisible = true;
      } else {
        a.isVisible = false;
      }
      a.approvalsList = [];
    });
  }

  addNewApproval(): void {
    const self = this;
    if (self.approvals.length >= 10) {
      return;
    }
    if (self.zone === 'A' || self.zone === 'B') {
      const approval = <Approver> {};
      approval.FormPartIdentifier = self.zone;
      approval.ApprovalID = 0;
      approval.isVisible = true;
      self.approvals.push(approval);
    } else {
      return;
    }
  }

  deleteApproval(approval: Approver): void {
    const self = this;
    self.alert.addAlertAndRequestAnswer('Do you want to delete approval ?', 'warning', 'Delete Approval');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.approvals = _.pull(self.approvals, approval);
      self.cd.markForCheck();
    });

  }

  callToSendToApproval(approval: Approver): void {
    const self = this;
    if (approval.ApprovalID === 0) {
      self.alert.addAlert('Approval must be saved before to send the request!', 'warning');
      return;
    }
    if (!approval.Email) {
      self.alert.addAlert('Valid approval email must be entered!', 'warning');
      return;
    }
    const acceptedEmailDomains = AppSettings.acceptedEmailDomains;
    const approvalEmailDomain = approval.Email.split('@')[1];

    if (!approvalEmailDomain) {
      self.alert.addAlert('Valid approval email must be entered!', 'warning');
      return;
    }

    if (!acceptedEmailDomains.find(x => x.toLowerCase().includes(approvalEmailDomain.toLowerCase()))) {
      self.alert.addAlert('Approval has an invalid domain for his email!', 'warning');
      return;
    }
    self.alert.addAlertAndRequestAnswer('Do you want to send request for approval?', 'warning', 'Send Request Approval');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.updateAproverAndSendRequest(approval);
    });
    return;
  }

  updateAproverAndSendRequest(approval: Approver): void {
    const self = this;
    self.interFormSvc._logger.debug('Saving approval data');
    self.interFormSvc._logger.debug('Approval JSON for Update is:' + JSON.stringify(approval));
    self.interFormSvc.startSpinner('card', 'Updating approval data ...');
    self.appointmentEditService.updateApproval(approval).subscribe(data => {
        self.interFormSvc.stopSpinner();
        if (data.statusCode === 'VPA000') {
          self.interFormSvc._logger.debug('Saving approval data was successful');
          self.interFormSvc.startSpinner('card', 'Sending approval request ...');
          const notification = <NotificationInputApi> {};
          if (approval.FormPartIdentifier === 'A') {
            notification.Type = '0';
          } else {
            notification.Type = '1';
          }
          notification.ID = approval.ApprovalID;
          self.appointmentEditService.sendNotification(notification).subscribe(resp => {
            self.interFormSvc.stopSpinner();
            if (resp.statusCode === 'VPA000') {
              self.interFormSvc._logger.debug('Sending approval request was successful');
              self.alert.addAlert('Request has been sent successfully!', 'warning');
            } else {
              self.alert.addAlert('Error occurred when sending approval request: ' + resp.errMessage, 'danger');
            }
          }, (error) => {
            self.interFormSvc.stopSpinner();
          });

        } else {
          self.alert.addAlert('Error occurred when saving approval: ' + data.errMessage, 'danger');
        }
      },
      (error) => {
        self.interFormSvc.stopSpinner();
      });
    return;
  }

  doApprove(approval: Approver): void {
    this.alert.addAlertAndRequestAnswer('Do you want to approve it?', 'warning', 'Send Approval');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      this.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      this.setApproveReturn(approval, true);
    });
    return;
  }

  doReturn(approval: Approver): void {
    approval.intendToReturn = true;
    if (approval.CommentForReturn.length < 3) {
      this.alert.addAlert('You can enter your reason for return in comments section!');
      return;
    }
    this.alert.addAlertAndRequestAnswer('Do you really want to return the form for changes?', 'warning', 'Send Return');
    const subscription = this.alert.requestConfirmationAnswer$.subscribe(item => {
      this.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      this.setApproveReturn(approval, false);
    });
    return;
  }

  setApproveReturn(approval: Approver, isApproved: boolean): void {
    const self = this;
    const approvalInput = <ApprovalInput> {};
    approvalInput.approvalID = approval.ApprovalID;
    approvalInput.isApproved = isApproved;
    approvalInput.comment = approval.CommentForReturn;
    approvalInput.sendNotification = true;
    self.interFormSvc.startSpinner('card', 'Sending your response....');
    self.appointmentEditService.setApprovalAnswer(approvalInput).subscribe(resp => {
        self.interFormSvc.stopSpinner();
        if (resp.statusCode === 'VPA000') {
          self.interFormSvc._logger.debug('Sending approval response was successful');
          self.alert.addAlert('Response has been sent successfully!', 'warning');
        } else {
          self.alert.addAlert('Error occurred when sending your response: ' + resp.errMessage, 'danger');
        }
      },
      (error) => {
        self.interFormSvc.stopSpinner();
      });
  }

  search(term: string, approval: Approver) {
    const self = this;
    if (term.length < 2) {
      approval.approvalsList = null;
      return;
    }
    // self.interFormSvc.startSpinner('card', 'Searching for approvals ...');
    self.searchTermStream$.next({searchValue: term, forApprover: approval});
  }

  selectUser(user: IUser, approval: Approver) {
    approval.UserID = user.UserID;
    approval.Email = user.EMail;
    approval.approvalsList = null;
  }


}
