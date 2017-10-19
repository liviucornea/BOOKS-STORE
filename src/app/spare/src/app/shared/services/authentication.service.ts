import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserDTO} from '../DTO/UserDTO';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {AppSettings} from '../configuration/appSettings';
import {AlertService} from './alert.service';
import {InterFormsService} from './inter-forms.service';
import {Logger} from 'angular2-logger/core';

@Injectable()
export class AuthenticationService {
  private isLoggedIn = false;
  /*
  currentUser is the user who is logged in. Hist profile is built up and is used accross app
  he will have a list of Skills which he will be able to manage and as well authorization profile embeded
   see UserDTO for more clarity
  */
  public currentUser: UserDTO;
  contentTypeDefault: string;
  contentTypeJson: string;

  constructor(private router: Router, private http: Http, private alertService: AlertService,
              private interFormSvc: InterFormsService) {
    this.currentUser = new UserDTO('GUEST');
    this.contentTypeDefault = 'application/x-www-form-urlencoded';
    this.contentTypeJson = 'application/json';
  }

  public authenticated(): boolean {
    return this.isLoggedIn;
  }

  public login(userId: string, ds: string) {
    const self = this;
    /// built user profile;
    self.interFormSvc.startSpinner('card', 'Loading your login profile...');
    self.interFormSvc._logger.warn('Login web service is called!');
    self.loadSkillSynchUserProfile(userId, ds).subscribe(data => {
      if (data) {
        self.interFormSvc._logger.warn('Skill Synch User profile data: ' + JSON.stringify(data));
        if (data.statusCode === 'SKS000') {
          if (!data.isActive) {
            self.noSkillSynchProfile();
            return;
          }
          self.currentUser = new UserDTO(userId);
          self.currentUser.adLoginId = data.loginId;
          self.currentUser.isLoggedIn = true;
          self.currentUser.firstName = data.firstName;
          self.currentUser.lastName = data.lastName;
          self.currentUser.isAdministrator = data.isAdministrator;
          self.currentUser.message = data.message;
          self.currentUser.hasAccessToReports = data.hasAccessToReports;
          self.currentUser.dataSource = ds;
          self.currentUser.skills = data.skills.sort((a, b) => a.code.localeCompare(b.code));
          self.interFormSvc.stopSpinner();
          self.isLoggedIn = true;
          if (self.currentUser.isAdministrator) {
            self.interFormSvc._logger.warn('User with admin login profile has been loaded');
            self.router.navigate(['admin']);
          } else {
            self.interFormSvc._logger.warn('Non administrator login profile has been loaded');
            self.router.navigate(['search']);
          }
        } else {
          self.isLoggedIn = false;
          self.interFormSvc.stopSpinner();
          self.router.navigate(['login']);
          self.interFormSvc._logger.error('No skill synch profile identified by rest API!');
          self.interFormSvc._logger.error('See JSON web service response:' + JSON.stringify(data));
          self.alertService.error('You don\'t have a profile to use Skill Synch App.');
        }
      } else {
        self.noSkillSynchProfile();
      }
    }, (error => {
      self.interFormSvc.stopSpinner();
      self.interFormSvc._logger.warn('Skill Synch profile error: ' + error);
      self.alertService.error('Skill Synch profile error: ' + error);
      console.log(error);
    }))
  }

  protected noSkillSynchProfile() {
    const self = this;
    self.isLoggedIn = false;
    self.interFormSvc._logger.warn('Login web service is returning invalid data or user is inactive!');
    self.isLoggedIn = false;
    self.interFormSvc.stopSpinner();
    self.router.navigate(['login']);
    self.alertService.error('Error encountered when try to retrieve yor profile!');
  }

  public loadADUserProfile(): Observable<any> {
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const self = this;
    self.interFormSvc._logger.warn('Getting prelogin information from: ' + AppSettings.apiSettings.apiURL_BASE + '/preLogin');
    return self.http.get(AppSettings.apiSettings.apiURL_BASE + '/preLogin', requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('preLogin web service responded!');
          const adProfile = res.json();
          self.interFormSvc._logger.warn('AD profile: ' + JSON.stringify(adProfile));
          if (adProfile.dataSource && adProfile.dataSource.length === 0) {
            self.interFormSvc._logger.error('No data sources from pre login service: ' + JSON.stringify(adProfile));
            throw res;
          }
          if (adProfile.statusCode !== 'SKS000') {
            self.interFormSvc._logger.error('Invalid response status from pre login service: ' + JSON.stringify(adProfile));
            throw res;
          }
          adProfile.dataSource.forEach(x => {
            if (x.description.trim().length === 0) {
              x.description = x.name;
            }
          })
          self.interFormSvc.availableDataSources = adProfile.dataSource;
          return adProfile;
        }
      ).catch(self
        .handleError
      );
  }


  public logout() {
// reset profile to GUEST
    this.currentUser = new UserDTO('GUEST');
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
    this.interFormSvc._logger.warn('User log out!');
    this.isLoggedIn = false;
  }

  loadSkillSynchUserProfile(adLoginId: string, dataSource: string): Observable<any> {
    // getting skill synch profile and store it in currentUser (an USerDTO object) to be used through entire application
    const self = this;
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const params: URLSearchParams = new URLSearchParams();
    params.set('loginId', adLoginId);
    params.set('dataSource', dataSource);
    requestOptions.params = params;
    self.interFormSvc._logger.warn('Loading SkillSynch UserProfile from : ' + AppSettings.apiSettings.apiURL_BASE + '/getUser');
    return this.http.get(AppSettings.apiSettings.apiURL_BASE + '/getUser', requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('Loading SkillSynch UserProfile is successful');
          return res.json();
        }
      ).catch(this
        .handleError
      );
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
