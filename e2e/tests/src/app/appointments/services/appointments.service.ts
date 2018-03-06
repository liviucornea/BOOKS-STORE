import {Injectable} from '@angular/core';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {Http, RequestOptions, URLSearchParams, Headers, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {AppNotificationsMSG, AppSettings} from '../../shared/configuration/appSettings';
import {AlertService} from '../../shared/services/alert.service';

@Injectable()
export class AppointmentsService {

  constructor(private http: Http, private interFormSvc: InterFormsService, private alertService: AlertService) {
  }

  loadAppointments(): Observable<any> {
    const searchParams = {};
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const params: URLSearchParams = new URLSearchParams();
    // params.set('datasource', dataSourceId);
    //  requestOptions.params = params;
    const body = JSON.stringify(searchParams);
    const self = this;
    self.interFormSvc.startSpinner('card', AppNotificationsMSG.loadingAppointments);
    self.interFormSvc._logger.warn('Getting appointments list from:' + AppSettings.apiEP.apiURL_BASE
      + AppSettings.apiEP.apiGetAppointments);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetAppointments, body, requestOptions)
      .map(
        res => {
          self.interFormSvc.stopSpinner();
          const data = res.json();
          self.interFormSvc._logger.debug('Response when get appointments list:' + JSON.stringify(res.json()));
          if (data.statusCode !== 'VPA000') {
             self.interFormSvc._logger.error('Invalid response status from user info end point: ' + JSON.stringify(data));
            self.alertService.error('Unable to get appointments list: ' + data.errMessage);
            throw res;
          }
            return data.packageData;

        }
      ).catch(self.handleError);
  }

  requestExport(formsIds: Array<number>): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify({'ids': formsIds});
  // const  body = '';
    const self = this;
    self.interFormSvc._logger.warn('Request export to excel started using:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiRequestExport);
    self.interFormSvc._logger.warn('Forms ids for excel export are: ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiRequestExport , body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid request export to excel !');
          return res.json();
        }
      ).catch(self.handleError);
  }
  downloadExcelFile(path): Observable<Blob> {
    const self = this;
    const options = new RequestOptions({responseType: ResponseContentType.Blob});
    options.withCredentials = true;
    self.interFormSvc._logger.warn('Export link used for excel is:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDownloadExport + '/' + path);
    return self.http.get(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDownloadExport + '/' + path, options)
      .map(res => res.blob())
      .catch(this.handleError);
  }

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
