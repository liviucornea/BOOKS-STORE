import {BOOKS_INITIAL_STORE_DATA, BooksStoreData} from '../states/books-store-data';
import {Action, ActionReducer} from '@ngrx/store';
import {BOOKS_LOADED_ACTION, BooksLoadedAction} from '../actions/BooksLoadedAction';
import * as _ from 'lodash';


export const booklistStoreData: ActionReducer<BooksStoreData> = (state: BooksStoreData = BOOKS_INITIAL_STORE_DATA, action: Action) => {
  switch (action.type) {

    case BOOKS_LOADED_ACTION:
      return handleBooksLoaded(state, action);

    default:
      return state;
  }
};

function handleBooksLoaded(state: BooksStoreData, action: Action): BooksStoreData {
    return {
      books: _.keyBy(action.payload.books, 'bookId')
    };

}
