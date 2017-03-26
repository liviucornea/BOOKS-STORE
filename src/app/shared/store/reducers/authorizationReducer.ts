import {Action} from '@ngrx/store';
import {USER_AUTHORIZED} from '../actions/AuthorizedActions';
export interface AuthorizationState {
  roleType: string;
}
export const INITIAL_AUTH_STATE: AuthorizationState = {
  roleType: 'GUEST',
};


export const authorizationReducer = (
  (state: AuthorizationState = INITIAL_AUTH_STATE, action: Action) => {
    switch (action.type) {
      case USER_AUTHORIZED:
        return {
          roleType: action.payload
        }
      default:
        return state;
    }
  });
