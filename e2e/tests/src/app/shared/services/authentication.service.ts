import { Injectable } from '@angular/core';
import {UserDTO} from '../DTO/UserDTO';
import {Router} from '@angular/router';
import {Http, RequestOptions, Headers} from '@angular/http';
import {AlertService} from './alert.service';
import {InterFormsService} from './inter-forms.service';
import {Observable} from 'rxjs/Observable';
import {AppNotificationsMSG, AppSettings} from '../configuration/appSettings';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
  private isLoggedIn = false;

  public currentUser: UserDTO;
  contentTypeDefault: string;
  contentTypeJson: string;
mySelf:  AuthenticationService;
  constructor(private router: Router, private http: Http, private alertService: AlertService,
              private interFormSvc: InterFormsService) {
    this.currentUser = new UserDTO(0);
    this.contentTypeDefault = 'application/x-www-form-urlencoded';
    this.contentTypeJson = 'application/json';
    this.mySelf = this;
  }

  public authenticated(): boolean {
    return this.isLoggedIn;
  }

  public loadADUserProfile(): Observable<any> {
    const searchParams = {};
    const self = this;
    self.interFormSvc.startSpinner('card', AppNotificationsMSG.loadingActiveDirectoryInfo);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    const body = JSON.stringify(searchParams);
    self.interFormSvc._logger.warn('Getting user information from: ' + AppSettings.apiEP.apiURL_BASE +  AppSettings.apiEP.apiGetUserInfo);
    return self.http.post(AppSettings.apiEP.apiURL_BASE + AppSettings.apiEP.apiGetUserInfo, body, requestOptions)
      .map(
        res => {
          self.interFormSvc._logger.warn('User Info end point responded!');
          self.interFormSvc.stopSpinner();
          const adProfile = res.json();
          if (adProfile.statusCode !== 'VPA000') {
            self.interFormSvc._logger.error('Invalid response status from user info end point: ' + JSON.stringify(adProfile));
            self.alertService.error('Unable to load Active directory profile: ' + adProfile.errMessage);
           // throw adProfile;
            return adProfile;
          }
          self.isLoggedIn = true;
          self.currentUser =  adProfile.packageData  ? adProfile.packageData : self.currentUser ;
          self.currentUser.BusinessLines = [];
          self.currentUser.isLoggedIn = true;
          if (self.currentUser.RoleName.toUpperCase() === 'LEADERSHIP') {
            self.interFormSvc.menuOptions.next('LEADERSHIP');
          }
          self.interFormSvc._logger.warn('Active Directory  profile: ' + JSON.stringify(adProfile));
          return adProfile;
        }
      ).catch(self
        .handleError
      );
  }
  private handleError(error: Response | any ) {
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

  public logout() {
// reset profile to GUEST
    this.currentUser = new UserDTO(0);
    localStorage.removeItem('id_token');
    this.interFormSvc._logger.warn('User log out!');
    this.isLoggedIn = false;
  }


  public doAuthentication(): void {
    const self = this;
    self.loadADUserProfile().subscribe(data => {
      self.interFormSvc.stopSpinner();
   //   self.router.navigate(['appointments']);
    }, ( (error) => {
      // on error loading user profile stop the spinner and redirect to not authorized as user is unknown is not loaded...
      self.interFormSvc.stopSpinner();
      self.router.navigate(['notAuthorized']);
      self.alertService.error(AppNotificationsMSG.errorLoadingActiveDirectoryInfo);
      console.log(error);
    }));
  }


}
