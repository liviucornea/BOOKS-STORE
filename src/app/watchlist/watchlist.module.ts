import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksListComponent} from './books-list/books-list.component';
import {BookListUiComponent} from './book-list-ui/book-list-ui.component';
import {WatchlistComponent} from './watchlist.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {SharedModule} from '../shared/shared.module';
import {watchlistRouting} from './watchlist.routes';
import {BooksService} from './shared/services/books.service';
import {BooksEffects} from './store/effects/BooksEffects';
import {EffectsModule} from '@ngrx/effects';




@NgModule({
  declarations: [
    BooksListComponent,
    BookListUiComponent,
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    watchlistRouting,
    EffectsModule.run(BooksEffects),
    SharedModule
  ],
  providers: [
    BooksService
  ]
})
export class WatchlistModule {
}
