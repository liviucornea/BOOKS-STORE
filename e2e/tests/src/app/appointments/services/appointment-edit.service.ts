import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {AlertService} from '../../shared/services/alert.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AppSettings} from '../../shared/configuration/appSettings';
import {Appointment} from '../../shared/domain/Appointment';
import {Approver} from '../../shared/domain/Approver';
import {ApprovalInput} from '../../shared/domain/ApprovalInput';

@Injectable()
export class AppointmentEditService {

  constructor(private http: Http, private alertService: AlertService,
              private interFormSvc: InterFormsService) {
  }

  getAppointment(id: number): Observable<Appointment> {
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const self = this;
    const body = JSON.stringify(id);
    self.interFormSvc._logger.warn('Getting appointment details from: ' + AppSettings.apiEP.apiURL_BASE +
      AppSettings.apiEP.apiGetAppointment);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetAppointment + '/' + id, body, requestOptions)
       .map(
        res => {
          const data = res.json();
          self.interFormSvc._logger.warn('Appointment details end point responded!: ' + JSON.stringify(data));
          if (data.statusCode !== 'VPA000') {
            self.interFormSvc._logger.error('Invalid response status from appointment details service: ' + JSON.stringify(data));
            self.alertService.addAlert('API error occurred when getting appointment details: ' + data.errMessage, 'danger');
            throw res;
          }
          return data.packageData;
        }
      ).catch(self
        .handleError
      );
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;

    const body = JSON.stringify(appointment);
    const self = this;
    self.interFormSvc._logger.warn('Update appointment started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiUpdateAppointment);
    self.interFormSvc._logger.warn('Appointment JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiUpdateAppointment, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when appointment is updated!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  createAppointment(appointment: Appointment): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;

    const body = JSON.stringify(appointment);
    const self = this;
    self.interFormSvc._logger.warn('Create appointment started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiCreateAppointment);
    self.interFormSvc._logger.warn('Appointment JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiCreateAppointment, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when appointment is created!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  deleteAppointment(id: number): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;

    const body = JSON.stringify(id);
    const self = this;
    self.interFormSvc._logger.warn('Delete appointment started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDeleteAppointment);
    self.interFormSvc._logger.warn('Appointment id is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDeleteAppointment + '/' + id, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when appointment is deleted!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  uploadFile(event: any, formID: number): Observable<any> {
    const self = this;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const headers = new Headers();
      /** No need to include Content-Type in Angular 4 */
      // headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({headers: headers});
      options.withCredentials = true;
      return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiUploadFile + '/' + formID, formData, options)
        .map(
          res => {
            self.interFormSvc._logger.warn('Valid response received when file is uploaded!');
            return res.json();
          }
        ).catch(self.handleError);

    }
  }

  downloadFile(id): Observable<Blob> {
    const self = this;
    const options = new RequestOptions({responseType: ResponseContentType.Blob});
    options.withCredentials = true;
    return self.http.get(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDownloadFile + '/' + id, options)
      .map(res => res.blob())
      .catch(this.handleError);
  }

  deleteFile(id: number): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(id);
    const self = this;
    self.interFormSvc._logger.warn('Delete file started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDeleteFile);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDeleteFile + '/' + id, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when file is deleted!');
          return res.json();
        }
      ).catch(self.handleError);
  }

// Approvals region
  updateApproval(approver: Approver): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;

    const body = JSON.stringify(approver);
    const self = this;
    self.interFormSvc._logger.warn('Update approver started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiUpdateApproval);
    self.interFormSvc._logger.warn('Approval JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiUpdateApproval, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when approver is updated!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  setApprovalAnswer(approvalInput: ApprovalInput): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(approvalInput);
    const self = this;
    self.interFormSvc._logger.warn('Set approval answer  started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiSetApproval);
    self.interFormSvc._logger.warn('Appointment JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiSetApproval, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when approver is updated!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  sendNotification(notification: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(notification);
    const self = this;
    self.interFormSvc._logger.warn('Send request approval :' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiSendRequestApproval);
    self.interFormSvc._logger.warn('Notification JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiSendRequestApproval, body, requestOptions)
      .map(
        res => {
          return res.json();
        }
      ).catch(self.handleError);
  }

// end of Approval region
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
