import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDescriptionComponent } from './dynamic-description.component';

describe('DynamicDescriptionComponent', () => {
  let component: DynamicDescriptionComponent;
  let fixture: ComponentFixture<DynamicDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
