import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {AppSettings} from '../../shared/configuration/appSettings';
import {Observable} from 'rxjs/Observable';
import {AlertService} from '../../shared/services/alert.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Logger} from 'angular2-logger/core';
import {Approver} from '../../shared/domain/Approver';

@Injectable()
export class ApproversService {

  constructor(private http: Http, private interFormSvc: InterFormsService,
              private autheticationSvc: AuthenticationService, private _logger: Logger,
              private alert: AlertService) {
  }

  search(terms: Observable<any>, debounceMs = 300) {
    const self = this;
    return terms.debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(term => self.loadUsers(term.searchValue, term.forApprover));
  }

  loadUsers(inputParam: string, forApprover: Approver): Observable<any> {
    // suppose your API is true one and is accepting search param
    // than you ay pass it here , for now is passed but is not used for search by the API
    const searchParams = {userName: inputParam};
    const requestOptions = new RequestOptions();
    const searchedValue = inputParam.toUpperCase();
    requestOptions.withCredentials = true;
    const self = this;
    const body = JSON.stringify(searchParams);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetUsers, body, requestOptions)
      .map(
        res => {
          const data = res.json();
          self._logger.warn('Load users with response :' + JSON.stringify(data));
          if (data.statusCode !== 'VPA000') {
            self._logger.error('Invalid response status from get users API: ' + JSON.stringify(data));
            self.alert.addAlert('Error when try to load users: ' + data.errMessage);
            throw res;
          }
          forApprover.approvalsList = data.packageData.filter(user => {
              const byEmail = user.EMail ? user.EMail.toUpperCase().includes(searchedValue) : false;
              const byFName = user.FirstName ? user.FirstName.toUpperCase().includes(searchedValue) : false;
              const byLName = user.LastName ? user.LastName.toUpperCase().includes(searchedValue) : false;
              const byUName = user.UserName ? user.UserName.toUpperCase().includes(searchedValue) : false;
              return byEmail || byFName || byLName || byUName;
            }
          );
          return true;
        }
      ).catch(self.handleError);
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
