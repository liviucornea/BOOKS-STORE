import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../shared/store/base/appReducer';
import {LoadBooksAction} from '../store/actions/LoadBooksAction';
import {Observable} from 'rxjs/Observable';
import {BookModel, stateToBooksSelector} from './models/book-model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books$: Observable<BookModel[]>;
  myData: any;

  constructor(private store: Store<AppState>) {

    this.books$ = store.select(stateToBooksSelector);
    /*
     this.books$ = store.select('booklistStoreData');
     this.books$.subscribe(data => {
     this.myData = data;
     });*/
  }

  ngOnInit() {
    this.store.dispatch(new LoadBooksAction());
  }

}
