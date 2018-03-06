import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {AlertService} from '../../shared/services/alert.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {Appointment} from '../../shared/domain/Appointment';
import {FileAttachment} from '../../shared/domain/FileAttachment';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {AppointmentEditService} from '../services/appointment-edit.service';
import {saveAs as importedSaveAs} from 'file-saver';
import * as _ from 'lodash';
import {AppSettings} from "../../shared/configuration/appSettings";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-file-attachments',
  templateUrl: './file-attachments.component.html',
  styleUrls: ['./file-attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileAttachmentsComponent implements OnInit {

  @Input() appointment: Appointment;
  @Input() attachmentsList: Array<FileAttachment>;
  public expanded: boolean;
  public uploadNew: boolean;
  public allowDelete  = true;

  constructor(private interFormSvc: InterFormsService, public authenticationService: AuthenticationService,
              private appointmentEditSvc: AppointmentEditService, private route: ActivatedRoute,
              private alert: AlertService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.expanded = true;
    this.uploadNew = false;
    const approvalId = +this.route.snapshot.paramMap.get('approvalId');
    if(approvalId) {
      this.allowDelete = false;
    }
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  toggleUpload(): void {
    this.uploadNew = !this.uploadNew;
  }

  downloadFile(fileID: number, fileName: string): void {
    const self = this;
    self.interFormSvc.startSpinner('card', 'Start to download the file....');
    self.appointmentEditSvc.downloadFile(fileID)
      .subscribe(data => {
          self.interFormSvc._logger.warn('Valid response received when file is downloaded!');
          importedSaveAs(data, fileName);
          self.interFormSvc.stopSpinner();
        },
        error => {
          console.log('Error downloading the file.' + error.toString());
          self.interFormSvc.stopSpinner();
        }
        ,
        () => console.log('Completed file download.'));
  }

// upload the file
  fileChange(event: any) {
    const self = this;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (file.size > AppSettings.maxUploadFileSize) {
        self.alert.error('File size is too large! Maximum 10 MB are supported.');
        return;
      }
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const headers = new Headers();
      /** No need to include Content-Type in Angular 4 */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({headers: headers});
      self.interFormSvc.startSpinner('card', 'File upload started....');
      self.appointmentEditSvc.uploadFile(event, self.appointment.VPAppointmentFormID)
        .subscribe(
          data => {
            self.interFormSvc.stopSpinner();
            if (data.statusCode !== 'VPA000') {
              self.alert.addAlert('Error status code: ' + data.statusCode + ' -> ' + data.errMessage);
              return;
            }
            if (data.packageData.length === 0) {
              self.alert.addAlert('Error uploading the file! Empty packageData!');
              return;
            } else {
              const theFile = <FileAttachment> {};
              theFile.FileName = data.packageData[0].FileName;
              theFile.FileID = data.packageData[0].FileID;
              theFile.UploadedDate = data.packageData[0].UploadedDate;
              theFile.UploadedBy = data.packageData[0].UploadedBy;
              self.attachmentsList.push(theFile);
              self.cd.markForCheck();
            }
            self.alert.addAlert('File upload successful!');
          },
          error => {
            self.interFormSvc.stopSpinner();
            self.alert.addAlert('Error when uploading the file: ' + error.toString());
            console.log(error);

          }
        );
    }
  }

  callToDeleteFile(file: FileAttachment): void {
    const self = this;
    self.alert.addAlertAndRequestAnswer('Do you want to delete the file?', 'warning', 'Delete file');
    const subscription = self.alert.requestConfirmationAnswer$.subscribe(item => {
      self.alert.askConfirmation = false;
      subscription.unsubscribe();
      if (item !== 'OK') {
        return;
      }
      self.deleteFile(file);
    });
    return;
  }

  deleteFile(file: FileAttachment): void {
    const self = this;
    self.interFormSvc.startSpinner('card', 'Delete file in progress...');
    self.appointmentEditSvc.deleteFile(parseInt(file.FileID, 0)).subscribe(data => {
      if (data.statusCode === 'VPA000') {
        self.attachmentsList = _.pull(self.attachmentsList, file);
        self.cd.markForCheck();
        self.interFormSvc.stopSpinner();
        self.alert.addAlert('File deleted !');

      }

    }, () => {
      self.interFormSvc.stopSpinner();
      self.alert.addAlert('An error occurred while doing file deletion', 'error');
    });

  }


}
