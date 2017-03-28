

import * as _ from 'lodash';
import {Book} from '../../shared/domain/Book';
import {AppState} from '../../../shared/store/base/appReducer';


export interface BookModel {
  data: Book;
}

export function stateToBooksSelector(state: AppState): BookModel[] {

  const books = _.values<Book>(state.booklistStoreData.books);

  // @todo add deep freeze strict
  return books.map(_.partial(mapToBookModel, state));
}




function mapToBookModel(state: AppState, book: Book): BookModel {
  // if needed get some other stuff from store into the model
  return {
    data: book
  };
}

