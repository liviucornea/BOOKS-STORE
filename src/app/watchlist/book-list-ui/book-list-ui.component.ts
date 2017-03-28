import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BookModel} from '../books-list/models/book-model';

@Component({
  selector: 'app-book-list-ui',
  templateUrl: './book-list-ui.component.html',
  styleUrls: ['./book-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListUiComponent implements OnInit {

  @Input()
  books: BookModel[];
  constructor() {
  }

  ngOnInit() {
  }

}
