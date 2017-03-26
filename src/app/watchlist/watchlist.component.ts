import {Component, OnInit} from '@angular/core';
import {BooksService} from './shared/services/books.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  books: any;

  constructor(public bs: BooksService) {
  }

  ngOnInit() {
    this.bs.loadBooks().subscribe(
      (data) => {
        this.books = data;
      });

  }

}
