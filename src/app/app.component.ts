import {Component, OnInit} from '@angular/core';

import {Store, ActionReducer, combineReducers} from '@ngrx/store';
import {AppState, appReducer} from './shared/store/base/appReducer';
import {UserLoggedInAction} from './shared/store/actions/UserActions';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private store: Store<AppState>) {
      }

  ngOnInit() {
    }
 }
