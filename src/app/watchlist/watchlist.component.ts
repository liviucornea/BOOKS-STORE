import {Component, OnInit} from '@angular/core';
import {BooksService} from './shared/services/books.service';


import {booklistStoreData} from './store/reducers/booksStoreDataReducer';
import {AppState, createReducer} from '../shared/store/base/appReducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

export const booksReducer = createReducer({booklistStoreData});


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  books: any;
  user$: Observable<any>;

  constructor( private store: Store<AppState>) {
    store.replaceReducer(booksReducer);

  }

  ngOnInit() {
/*    this.bs.loadBooks().subscribe(
      (data) => {
        this.books = data;
      });*/
    this.user$ = this.store.select('user');
  }

}
