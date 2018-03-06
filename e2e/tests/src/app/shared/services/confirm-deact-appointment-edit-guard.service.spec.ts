import { TestBed, inject } from '@angular/core/testing';

import { ConfirmDeactAppointmentEditGuardService } from './confirm-deact-appointment-edit-guard.service';

describe('ConfirmDeactAppointmentEditGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmDeactAppointmentEditGuardService]
    });
  });

  it('should be created', inject([ConfirmDeactAppointmentEditGuardService], (service: ConfirmDeactAppointmentEditGuardService) => {
    expect(service).toBeTruthy();
  }));
});
