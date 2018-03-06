import { TestBed, inject } from '@angular/core/testing';

import { ApproversService } from './approvers.service';

describe('ApproversService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproversService]
    });
  });

  it('should be created', inject([ApproversService], (service: ApproversService) => {
    expect(service).toBeTruthy();
  }));
});
