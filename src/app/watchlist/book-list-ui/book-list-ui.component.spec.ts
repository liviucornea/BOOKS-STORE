import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListUiComponent } from './book-list-ui.component';

describe('BookListUiComponent', () => {
  let component: BookListUiComponent;
  let fixture: ComponentFixture<BookListUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
