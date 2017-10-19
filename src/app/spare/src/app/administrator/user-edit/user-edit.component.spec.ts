import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import {FormsModule} from '@angular/forms';
import {
  AlertServiceStub, AuthenticationServiceStub,
  InterFormsServiceStub
} from '../../shared/MoksForTesting/servicesMoks';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {AlertService} from '../../shared/services/alert.service';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ UserEditComponent ],
      providers: [{provide: AlertService, useValue: AlertServiceStub},
        {provide: InterFormsService, useValue: InterFormsServiceStub},
      {
        provide: AuthenticationService, useValue: AuthenticationServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
