import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthorizationGuard  implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private authenticateService: AuthenticationService,
              private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    return this.checkAuthorized(url);
  }

  checkAuthorized(url: string): boolean {
    // Store the attempted URL for redirecting
    this.authorizationService.redirectUrl = url;
    const user = this.authenticateService.currentUser;
    let isAuthorized = true;
    if (url === '/admin' ) {
      isAuthorized = false;
    }
    // Navigate to not authorized if you are not logged in
    if (!isAuthorized) {
      this.router.navigate(['/notAuthorized']);
      return false;
    } else {
      return true;
    }
  }

}
