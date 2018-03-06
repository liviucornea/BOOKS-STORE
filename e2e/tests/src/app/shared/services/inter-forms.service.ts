import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Logger} from 'angular2-logger/core';
import {TranslateService} from 'ng2-translate';
import {AppSettings} from '../configuration/appSettings';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../DTO/UserDTO';
import {AlertService} from './alert.service';

/*
 This service is through application to start and stop spinner , trigger login action and set log level
*/
@Injectable()
export class InterFormsService {
  public spinnerEmitter: Subject<any>;
  public loginActionEmitter: Subject<any>;
  public  menuOptions: Subject<any>; // this is used to emit signal for header component to hide some menu options
  public allUsers: Array<UserDTO>;

  /*
  Logger levels :
  this._logger.error('This is a priority level 1 error message...');
 		this._logger.warn('This is a priority level 2 warning message...');
 		this._logger.info('This is a priority level 3 warning message...');
 		this._logger.debug('This is a priority level 4 debug message...');
 		this._logger.log('This is a priority level 5 log message...');
  */
  constructor(public _logger: Logger, private translateService: TranslateService, private http: Http,
              private alert: AlertService) {
    this.spinnerEmitter = new Subject();
    this.loginActionEmitter = new Subject();
    this.menuOptions = new Subject();
    // set default log level to ERROR
    this._logger.level = this._logger.Level.ERROR;
    this.allUsers = [];
  }

  public startSpinner(scope?: string, text?: string) {
    const spinner = {
      isSpinnerRunning: true,
      spinnerText: text,
      spinnerScope: scope
    };
    this.spinnerEmitter.next(spinner);
  }

  public stopSpinner() {
    const spinner = {
      isSpinnerRunning: false
    };
    this.spinnerEmitter.next(spinner);
  }

  languageChange(code: string) {
    this.translateService.use(code);
  }

  loadBusinessLines(user?: UserDTO): Observable<any> {
    const searchParams = {};
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const params: URLSearchParams = new URLSearchParams();
    const self = this;
    const body = JSON.stringify(searchParams);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetBusinessLines, body, requestOptions)
      .map(
        res => {
          const data = res.json();
          self._logger.warn('Load business lines with response :' + JSON.stringify(data));
          if (data.statusCode !== 'VPA000') {
            self._logger.error('Invalid response in interformservice when getting business lines: ' + JSON.stringify(data));
            self.alert.addAlert('Error when try to load business lines: ' + data.errMessage);
            throw res;
          }
          return data.packageData;
        }
      ).catch(self.handleError);
  }


  loadUsers(): Observable<any> {
    const searchParams = {};
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const self = this;
    const body = JSON.stringify(searchParams);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetUsers, body, requestOptions)
      .map(
        res => {
          const data = res.json();
          self._logger.warn('Load users with response :' + JSON.stringify(data));
          if (data.statusCode !== 'VPA000') {
            self._logger.error('Invalid response status from get users service: ' + JSON.stringify(data));
            self.alert.addAlert('Error when try to load users: ' + data.errMessage);
            throw res;
          }
          self.allUsers = data.packageData;
          return data.packageData;
        }
      ).catch(self.handleError);
  }

// this load business lines and all users
  loadBusinessInfo(): Observable<any> {
    const self = this;
    return Observable.forkJoin(self.loadBusinessLines(), self.loadUsers());
   // return self.loadUsers().mergeMap(item => self.loadBusinessLines());
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
