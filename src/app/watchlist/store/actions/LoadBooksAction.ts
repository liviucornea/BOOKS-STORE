import {Action} from '@ngrx/store';

export const LOAD_BOOKS_ACTION = 'LOAD_BOOKS_ACTION';

export class LoadBooksAction implements Action {
  readonly type = LOAD_BOOKS_ACTION;

  constructor(public payload?: any) {

  }

}
