import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import {BooksDto} from '../dto/BooksDto';

@Injectable()
export class BooksService {

  constructor(private authHttp: AuthHttp) { }


  loadBooks(): Observable<BooksDto> {
    return this.authHttp.get('/api/bookslistInventories')
      .map(
        res => {
          return res.json();
        }
      );
  }

}
