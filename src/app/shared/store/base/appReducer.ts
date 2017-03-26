import { ActionReducer, combineReducers } from '@ngrx/store';
import { AuthorizationState, authorizationReducer, INITIAL_AUTH_STATE } from '../reducers/authorizationReducer';
import {UserState, userReducer, INITIAL_USER_STATE} from '../reducers/userReducer';


export interface AppState {
  authorization: AuthorizationState;
  user: UserState;
};


export const INITIAL_APPLICATION_STATE: AppState = {
  authorization: INITIAL_AUTH_STATE,
  user: INITIAL_USER_STATE
}

const reducers = {
  authorization: authorizationReducer,
  user: userReducer
}
const reducer: ActionReducer<any> = combineReducers(reducers);

export function appReducer(state: any = INITIAL_APPLICATION_STATE, action: any) {
  return reducer(state, action);
}

export function createReducer(asyncReducers = {}): ActionReducer<any> {
  return combineReducers(Object.assign({
    authorization: authorizationReducer,
    user: userReducer,
    // any other reducers you always want to be available
  }, asyncReducers));
}

