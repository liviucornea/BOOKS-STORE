import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.authenticated()) {
      return true;
    } else {
      localStorage.setItem('redirect_url', state.url);
      // this.authenticationService.login();
      this.router.navigate(['login']);
      return false;
    }
  }
}
