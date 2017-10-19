import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMassUpdateComponent } from './users-mass-update.component';

describe('UsersMassUpdateComponent', () => {
  let component: UsersMassUpdateComponent;
  let fixture: ComponentFixture<UsersMassUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersMassUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersMassUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
