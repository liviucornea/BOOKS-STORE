import {Injectable} from '@angular/core';
import {AlertService} from '../shared/services/alert.service';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {AppNotificationsMSG, AppSettings} from '../shared/configuration/appSettings';
import {Observable} from 'rxjs/Observable';
import {Delegate} from '../shared/domain/Delegate';
import {AuthenticationService} from "../shared/services/authentication.service";


@Injectable()
export class DelegateService {

  constructor(private http: Http, private interFormSvc: InterFormsService,
              private autheticationSvc: AuthenticationService,
              private alertService: AlertService) {
  }

  loadAllDelegates(): Observable<any> {
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const self = this;
    const body = {};
    self.interFormSvc._logger.warn('Getting delegations from: ' + AppSettings.apiEP.apiURL_BASE +
      AppSettings.apiEP.apiGetAllDelegations);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetAllDelegations, body, requestOptions)
      .map(
        res => {
          const response = res.json();
          self.interFormSvc._logger.warn('Get all delegations end point responded!: ' + JSON.stringify(response));
          if (response.statusCode !== 'VPA000') {
            self.interFormSvc._logger.error('Invalid response status from delegate service: ' + JSON.stringify(response));
            throw res;
          }
          return response.packageData;
        }
      ).catch(self
        .handleError
      );

  }

  loadDelegatesByUserID(userId: string): Observable<any> {
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const self = this;
    const body = JSON.stringify(userId);
    self.interFormSvc._logger.warn('Getting delegation details from: ' + AppSettings.apiEP.apiURL_BASE +
      AppSettings.apiEP.apiGetAccessDelegationById);
    self.interFormSvc.startSpinner('card', 'Getting appointment details....');
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetAccessDelegationById + '/' + userId, body, requestOptions)
      .map(
        res => {
          const response = res.json();
          self.interFormSvc._logger.warn('Appointment details end point responded!: ' + JSON.stringify(response));
          if (response.statusCode !== 'VPA000') {
            self.interFormSvc._logger.error('Invalid response status from appointment details service: ' + JSON.stringify(response));
            throw res;
          }
          // return AppointmentsList.find(x => x.VPAppointmentFormID === id);
          return response.packageData;
        }
      ).catch(self
        .handleError
      );

  }

  createDelegate(delegate: Delegate): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(delegate);
    const self = this;
    self.interFormSvc._logger.warn('Create delegate started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiCreateAccessDelegation);
    self.interFormSvc._logger.warn('Delegate JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiCreateAccessDelegation, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when access delegate is created!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  deleteDelegate(id: number): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(id);
    const self = this;
    self.interFormSvc._logger.warn('Delete delegate  started using end point:' +
      AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDeleteAccessDelegation);
    self.interFormSvc._logger.warn('Delegate id is : ' + body);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiDeleteAccessDelegation + '/' + id, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when delegate is deleted!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  search(terms: Observable<string>, debounceMs = 400) {
    return terms.debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(term => this.rawSearch(term));
  }

  rawSearch(term: string) {
    const self = this;
    const termCompare = term.toUpperCase();
    return self.interFormSvc.loadUsers().map(list =>
      list.filter(user => {
          if (self.autheticationSvc.currentUser.UserID === user.UserID) {
            return false;
          }
          if (user.RoleName && user.RoleName.toUpperCase() === 'LEADERSHIP'){
            return false;
          }
          const byEmail = user.EMail ? user.EMail.toUpperCase().includes(termCompare) : false;
          const byFName = user.FirstName ? user.FirstName.toUpperCase().includes(termCompare) : false;
          const byLName = user.LastName ? user.LastName.toUpperCase().includes(termCompare) : false;
          const byUName = user.UserName ? user.UserName.toUpperCase().includes(termCompare) : false;
          return byEmail || byFName || byLName || byUName;
        }
      ));
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
