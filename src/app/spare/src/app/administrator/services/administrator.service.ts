import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Response, URLSearchParams, Headers} from '@angular/http';
import {AppSettings} from '../../shared/configuration/appSettings';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserDTO} from '../../shared/DTO/UserDTO';
import * as _ from 'lodash';
import {InterFormsService} from '../../shared/services/inter-forms.service';

@Injectable()
export class AdministratorService {

  constructor(private http: Http, private interFormSvc: InterFormsService) {
  }

  loadUsers(dataSourceId: string): Observable<any> {
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const params: URLSearchParams = new URLSearchParams();
    params.set('datasource', dataSourceId);
    requestOptions.params = params;
    const self = this;
    self.interFormSvc._logger.warn('Load users started using endpoint: ' +
      AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiGetAllUsers);
    return self.http.get(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiGetAllUsers, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Load users is successful');
          return res.json().users;
        }
      ).catch(self.handleError);
  }

  updateUser(user: UserDTO): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;

    if (user.isAdministrator) {
      user.skills = [];
    } else {
      _.remove(user.skills, x => !x.isSelected);
    }
    const body = JSON.stringify(user);
    const self = this;
    self.interFormSvc._logger.warn('Update user started using end point:' +
      AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiUpdateUser);
    self.interFormSvc._logger.warn('User JSON used for update is : ' + body);
    return self.http.post(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiUpdateUser, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Valid response received when user is updated!');
          return res.json();
        }
      ).catch(self.handleError);
  }

  createUser(user: UserDTO): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    _.remove(user.skills, x => !x.isSelected);
    const body = JSON.stringify(user);
    const self = this;
    self.interFormSvc._logger.warn('Create user started using end point:' +
      AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiCreateUser);
    self.interFormSvc._logger.warn('JSON used to create new user is : ' + body);
    return self.http.post(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiCreateUser, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Create user is done successful');
          return res.json();
        }
      ).catch(self.handleError);
  }

  deactivateUser(user: UserDTO): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    _.remove(user.skills, x => !x.isSelected);
    const body = JSON.stringify(user);
    requestOptions.body = body;
    const self = this;
    self.interFormSvc._logger.warn('Create user started using end point:' +
      AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiDeleteUser);
    self.interFormSvc._logger.warn('JSON used to deactivate the user is : ' + body);
    return this.http.delete(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiDeleteUser, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Deactivating the user is successful');
          return res.json();
        }
      ).catch(this.handleError);
  }


  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
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
