import { Component } from '@angular/core';
import {environment} from '../environments/environment';
import {AuthenticationService} from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skill Sync App';
  logoPath: String = `${environment['assetPath']}/img/logoScotiaBank.bmp`;

  constructor(public authenticationService: AuthenticationService) { }

}
