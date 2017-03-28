import {Book} from '../../shared/domain/Book';
export interface BooksStoreData {

  books: { [key: string]: Book };


}

export const BOOKS_INITIAL_STORE_DATA: BooksStoreData = {
  books: {}
};
