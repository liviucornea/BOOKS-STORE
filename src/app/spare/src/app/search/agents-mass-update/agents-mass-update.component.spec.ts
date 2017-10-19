import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsMassUpdateComponent } from './agents-mass-update.component';

describe('AgentsMassUpdateComponent', () => {
  let component: AgentsMassUpdateComponent;
  let fixture: ComponentFixture<AgentsMassUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsMassUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsMassUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
