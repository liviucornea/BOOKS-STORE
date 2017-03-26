import {Action} from '@ngrx/store';
export interface AuthorizationState {
  roleType: string;
}
export const INITIAL_AUTH_STATE: AuthorizationState = {
  roleType: 'GUEST',
};


export const authorizationReducer = (
  (state: AuthorizationState = INITIAL_AUTH_STATE, action: Action) => {
    return state;
  });
