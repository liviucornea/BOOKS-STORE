import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-type-ahead',
  host: {'(keyup)': 'onKey($event)'},
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss']
})
export class TypeAheadComponent implements OnInit {

  @Input('search') public search: (term: string) => Promise<Array<{ id: string, text: string, email: string }>>;
  // public  search: (term: string) => Promise<Array<{ id: string, text: string }>>;
  @Output() selected = new EventEmitter();
  @Input('initialValue') public initialValue: string;
  private term = '';
  public listCmp: Array<{ id: string, text: string, email: string }> = [];
  private refreshTimer: any = undefined;
  private searchInProgress = false;
  private searchRequired = false;
  public itemDescription: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    const self = this;
    self.itemDescription = self.initialValue;
  }

  public onKey(event: any) {
    const self = this;
    if (event.keyCode === 27) {
      self.listCmp = [];
      event.target.value = null;
      return;
    }
    self.term = event.target.value;
    if (!self.refreshTimer) {
      self.refreshTimer = setTimeout(
        () => {
          if (!self.searchInProgress) {
            self.listCmp = [];
            self.doSearch(event.keyCode);
          } else {
            self.searchRequired = true;
          }
        },
        200);
    }

  }

  private doSearch(keyCode: number) {
    const self = this;
    self.refreshTimer = undefined;
    if (self.search && self.term !== '') {
      self.searchInProgress = true;
      self.search(self.term)
        .then((res) => {
          self.searchInProgress = false;
          if (self.searchRequired) {
            self.searchRequired = false;
            self.listCmp = [];
            self.doSearch(keyCode);
          } else {
            if (keyCode === 13) {
              self.listCmp = [];
              self.selected.emit({'email': self.term, 'text': ''});
            } else {
              self.displayList(res);
            }
          }
        });
    }
  }

  private displayList(list: Array<{ id: string, text: string, email: string }>) {
    this.listCmp = list;
  }

  selectItem(item) {
    this.selected.emit(item);
    if (this.listCmp) {
      this.listCmp = [];
      this.itemDescription = item.email;
    }
  }

  focusOut(item: any): void {
    if (this.listCmp.length === 0 && item ) {
      this.selected.emit({'email': item, 'text': ''});
    }
  }
  setFocus( elem: any) {
    elem.focus();
  }
}
