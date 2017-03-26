import {Action} from '@ngrx/store';
import {USER_LOGGED_IN} from '../actions/UserActions';

export interface UserState {
  userId: string;
}
export const INITIAL_USER_STATE: UserState = {
  userId: 'GUEST',
};

export const userReducer = (
  (state: UserState = INITIAL_USER_STATE, action: Action) => {
    switch (action.type) {
      case USER_LOGGED_IN:
        return {
          userId: action.payload
        }

      default:
        return state;
    }
  });
