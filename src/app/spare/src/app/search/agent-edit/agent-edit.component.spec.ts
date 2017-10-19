import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEditComponent } from './agent-edit.component';
import {FormsModule} from '@angular/forms';

describe('AgentEditComponent', () => {
  let component: AgentEditComponent;
  let fixture: ComponentFixture<AgentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AgentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
