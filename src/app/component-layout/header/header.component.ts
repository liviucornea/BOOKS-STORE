import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {environment} from '../../../environments/environment';
import {AppState} from "../../shared/store/base/appReducer";
import {Store} from "@ngrx/store";
import {ObservableInput} from "rxjs/Observable";
import {Observable} from "rxjs";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoPath: String = `${environment['assetPath']}/img/angular.svg`;
  user$: Observable<any>;
  constructor(private authenticationService: AuthenticationService, private store: Store<AppState>) {
    this.user$ = store.select('user');
  }

  ngOnInit() {
  }

  doLogIn() {
    const autService = this.authenticationService;
    this.authenticationService.login();
    const myVar = autService.authenticated();
  }
}
