import {Action} from '@ngrx/store';

export const BOOKS_LOADED_ACTION = 'BOOKS_LOADED_ACTION';

export class BooksLoadedAction implements Action {
  readonly type = BOOKS_LOADED_ACTION;

  constructor(public payload?: any) {

  }

}
