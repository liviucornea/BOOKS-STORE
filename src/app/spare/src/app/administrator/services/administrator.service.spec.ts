import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AdministratorService } from './administrator.service';
import {InterFormsService} from '../../shared/services/inter-forms.service';
import {InterFormsServiceStub} from '../../shared/MoksForTesting/servicesMoks';

describe('AdministratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {
        provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
        MockBackend,
        BaseRequestOptions, AdministratorService, {provide: InterFormsService, useValue: InterFormsServiceStub}]
    });
  });

  it('should be created', inject([AdministratorService], (service: AdministratorService) => {
    expect(service).toBeTruthy();
  }));
});
