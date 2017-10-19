import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogsReportsComponent } from './change-logs-reports.component';

describe('ChangeLogsReportsComponent', () => {
  let component: ChangeLogsReportsComponent;
  let fixture: ComponentFixture<ChangeLogsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
