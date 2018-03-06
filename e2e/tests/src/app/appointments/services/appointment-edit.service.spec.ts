import { TestBed, inject } from '@angular/core/testing';

import { AppointmentEditService } from './appointment-edit.service';

describe('AppointmentEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentEditService]
    });
  });

  it('should be created', inject([AppointmentEditService], (service: AppointmentEditService) => {
    expect(service).toBeTruthy();
  }));
});
