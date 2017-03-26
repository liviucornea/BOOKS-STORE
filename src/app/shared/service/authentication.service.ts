import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/base/appReducer';
import {UserLoggedInAction} from '../store/actions/UserActions';
import {UserAuthorizedAction} from "../store/actions/AuthorizedActions";

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthenticationService {
  // Configure Auth0
  lock = new Auth0Lock('u1MDRGTzLsquOe6SugA9fiClUEyTRDCN', 'teztdev.auth0.com',
    {
      auth: {
        params: {
          scope: 'openid email'
        }
      }
    });

  constructor(private router: Router, private store: Store<AppState>) {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      // console.info('saving authentication token', authResult);
      localStorage.setItem('id_token', authResult.idToken);
      // assuming you login with gith hub we use email like your user id
      this.store.dispatch(new UserLoggedInAction(authResult.idTokenPayload.email));
      this.store.dispatch(new UserAuthorizedAction('ADMINISTRATOR'));
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated(): boolean {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    const result: boolean = tokenNotExpired();
    return result;
  }

  public logout() {
    // Remove token from localStorage
   //  console.debug('logging out');
    localStorage.removeItem('id_token');
    this.store.dispatch(new UserLoggedInAction('GUEST'));
    this.router.navigate(['']);
  }
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}
