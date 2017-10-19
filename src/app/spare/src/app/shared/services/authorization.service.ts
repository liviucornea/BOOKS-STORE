import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthorizationService {
  isLoggedIn = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private authenticateService: AuthenticationService) {
    this.isLoggedIn = this.authenticateService.authenticated();
  }

  logout(): void {
    this.isLoggedIn = false;
  }


}
