import {Injectable}     from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot}    from '@angular/router';
import {AuthorizationService} from "./authorize.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;

    return this.checkAuthorized(url);
  }

  checkAuthorized(url: string): boolean {
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to not authorized if you are not logged in
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/notAuthorized']);
      return false;
    } else {
      return true;
    }
  }


}
