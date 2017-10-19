import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogsDetailsComponent } from './change-logs-details.component';

describe('ChangeLogsDetailsComponent', () => {
  let component: ChangeLogsDetailsComponent;
  let fixture: ComponentFixture<ChangeLogsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
