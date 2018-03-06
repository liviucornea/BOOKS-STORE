import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthorizationService {
  isLoggedIn = true;
  redirectUrl: string;
  constructor(private authenticateService: AuthenticationService) {
    this.isLoggedIn = this.authenticateService.authenticated();
  }

  logout(): void {
    this.isLoggedIn = false;
  }


}
