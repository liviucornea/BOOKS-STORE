import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AdministratorComponent} from './administrator.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {AuthenticationService} from '../shared/services/authentication.service';
import {AdministratorService} from './services/administrator.service';
import {InterFormsService} from '../shared/services/inter-forms.service';
import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';
import {
  InterFormsServiceStub, AdministratorServiceStub,
  AuthenticationServiceStub
} from '../shared/MoksForTesting/servicesMoks';

describe('AdministratorComponent', () => {
  let component: AdministratorComponent;
  let fixture: ComponentFixture<AdministratorComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [UsersListComponent, UserEditComponent, AdministratorComponent],
      providers: [{provide: InterFormsService, useValue: InterFormsServiceStub},
        {provide: AdministratorService, useValue: AdministratorServiceStub},
        {
          provide: AuthenticationService, useValue: AuthenticationServiceStub
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
