import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {InterFormsService} from '../../services/inter-forms.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSpinnerRunning = true;

  constructor(private router: Router, public authenticationService: AuthenticationService, private interFormSvc: InterFormsService) {
  }

  ngOnInit() {
  }

  doLogIn() {
    this.router.navigate(['login']);
    this.interFormSvc.runLoginAction('LOGIN');
  }

  doLogout() {
    this.authenticationService.logout();
  }

}
