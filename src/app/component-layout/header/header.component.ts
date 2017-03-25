import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoPath: String = `${environment['assetPath']}/img/angular.svg`;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  doLogIn() {
    const autService = this.authService;
    this.authService.login();
    const myVar = autService.authenticated();
  }
}
