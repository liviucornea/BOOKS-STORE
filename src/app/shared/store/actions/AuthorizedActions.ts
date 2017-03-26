import {Action} from '@ngrx/store';

export const USER_AUTHORIZED = 'USER_AUTHORIZED';

export class UserAuthorizedAction implements Action {
  readonly type = USER_AUTHORIZED;

  constructor(public payload?: any) {

  }

}
