import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authenticationService.authenticated()) {
      return true;
    } else {
      return this.authenticationService.loadADUserProfile().map((profile) => {
        if (profile.statusCode === 'VPA000') {
          console.log('authenticated');
         return true;
        }
        console.log('not authenticated');
        // this.router.navigateByUrl('/notAuthorized');
        this.router.navigate(['notAuthorized']);
        return false;
      }).first();
    }
  }
}
