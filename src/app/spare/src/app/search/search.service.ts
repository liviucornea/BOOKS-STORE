import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Response, URLSearchParams, Headers} from '@angular/http';
import {AppSettings} from '../shared/configuration/appSettings';
import {AgentDTO} from '../shared/DTO/AgentDTO';
import {InterFormsService} from '../shared/services/inter-forms.service';

@Injectable()
export class SearchService {

  constructor(private http: Http, private interFormSvc: InterFormsService) {
  }

  loadAgents(dataSourceId?: string): Observable<any> {
    const requestOptions = new RequestOptions();
    const self = this;
    requestOptions.withCredentials = true;
    const params: URLSearchParams = new URLSearchParams();
    params.set('datasource', dataSourceId);
    params.set('loginId', '');
    params.set('firstName', '');
    params.set('lastName', '');
    requestOptions.params = params;
    self.interFormSvc._logger.warn('Loading agents from:' + AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiGetAllAgents);
    return self.http.get(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiGetAllAgents, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Loading agents is successful');
          return res.json().agents;
        }
      ).catch(self.handleError);
  }

  loadAgentInfo(agent: AgentDTO): Observable<any> {
    const requestOptions = new RequestOptions();
    const self = this;
    requestOptions.withCredentials = true;
    const params: URLSearchParams = new URLSearchParams();
    params.set('loginId', agent.cmsLoginId);
    //  params.set('loginId', '60001');
    requestOptions.params = params;
    self.interFormSvc._logger.warn('Load Agent info from: ' + AppSettings.apiSettings.apiURL_BASE +
      AppSettings.apiSettings.apiGetAgent + 'for agent Id = ' + agent.cmsLoginId);
    return this.http.get(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiGetAgent, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Loading agent info is successful');
          return res.json();
        }
      ).catch(this.handleError);
  }

  updateAgent(agent: AgentDTO): Observable<any> {
    const headers = new Headers();
    const self = this;
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    // _.remove(agent.skills, x => !x.isSelected );
    const body = JSON.stringify(agent);
    self.interFormSvc._logger.warn('Update agent info using: ' +
      AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiUpdateAgent);
    self.interFormSvc._logger.warn('Agent JSON for update is:' + JSON.stringify(agent));
    return self.http.post(AppSettings.apiSettings.apiURL_BASE + AppSettings.apiSettings.apiUpdateAgent, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Update agent info is successful');
          return res.json();
        }
      ).catch(self.handleError);
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
