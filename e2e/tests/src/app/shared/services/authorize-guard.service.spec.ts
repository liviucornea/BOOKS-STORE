import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationGuard} from './authorize-guard.service';

describe('AuthorizeGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationGuard]
    });
  });

  it('should be created', inject([AuthorizationGuard], (service: AuthorizationGuard) => {
    expect(service).toBeTruthy();
  }));
});
