import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDelegateComponent } from './edit-delegate.component';

describe('EditDelegateComponent', () => {
  let component: EditDelegateComponent;
  let fixture: ComponentFixture<EditDelegateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDelegateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
