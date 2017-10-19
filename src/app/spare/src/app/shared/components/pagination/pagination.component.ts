import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {PagerService} from './pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input()
  allItems: any[];
  @Output()
  currentPageItems = new EventEmitter();
  // pager object it is built by pager service
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(private pagerService: PagerService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setPage(1);
    this.cd.markForCheck();
  }

 public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPageItems.emit(this.pagedItems);
  }


}
