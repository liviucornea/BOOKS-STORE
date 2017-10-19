import { TestBed, inject } from '@angular/core/testing';

import { InterFormsService } from './inter-forms.service';

describe('InterFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterFormsService]
    });
  });

  it('should be created', inject([InterFormsService], (service: InterFormsService) => {
    expect(service).toBeTruthy();
  }));
});
