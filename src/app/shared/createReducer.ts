import {ActionReducer, combineReducers} from '@ngrx/store';
// import { AuthState, authReducer } from './reducers/auth';
// import { UserState, userReducer } from './reducers/user';


export const INITIAL_AUTH_STATE: AuthState = {
  userId: 'GUEST',
};

export const authReducer = (
  (state: AuthState = INITIAL_AUTH_STATE, action: any) => {
    return state;
  });

export interface AppState {
  auth: AuthState;
  // user: UserState;
};

export function createReducer(asyncReducers = {}): ActionReducer<any> {
  return combineReducers(Object.assign({
    authReducer
    // user: userReducer,
    // any other reducers you always want to be available
  }, asyncReducers));
}

export const appReducer = createReducer();


export interface AuthState {
  userId: string;
}
