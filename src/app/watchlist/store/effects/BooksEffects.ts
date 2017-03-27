import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {LOAD_BOOKS_ACTION} from '../actions/LoadBooksAction';

import {BooksService} from '../../shared/services/books.service';
import {BooksLoadedAction} from '../actions/BooksLoadedAction';


@Injectable()
export class BooksEffects {
  @Effect() books: Observable<Action> = this.actions$
    .ofType(LOAD_BOOKS_ACTION)
    .switchMap(action => this.booksService.loadBooks())
    .map(books => new BooksLoadedAction(books) );

  constructor(private actions$: Actions, private booksService: BooksService) {
  }


}
