import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {AppSettings} from '../../shared/configuration/appSettings';
import {InterFormsService} from '../../shared/services/inter-forms.service';

@Injectable()
export class ReportsService {

  constructor(private http: Http,  private interFormSvc: InterFormsService) {
  }


  loadChangeLog(dtFrom: string, dtTo: string, dataSourceId?: string): Observable<any> {
    const searchParams = {'dataSourceId': dataSourceId, 'dtFrom': dtFrom, 'dtTo': dtTo};
    const self = this;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(searchParams);
    self.interFormSvc._logger.warn('Start loading change logs for period:' + dtFrom + ' - ' + dtTo);
    return this.http.post(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiChangeLogReports, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Load Change Log is successful');
          return res.json();
        }
      ).catch(this.handleError);
  }


  private handleError(error: Response | any) {
    this.interFormSvc._logger.warn('Error trying to load change log for reporting');
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
