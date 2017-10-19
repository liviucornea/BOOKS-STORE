import { TestBed, inject } from '@angular/core/testing';

import { ExportToExcelService } from './export-to-excel.service';

describe('ExportToExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportToExcelService]
    });
  });

  it('should be created', inject([ExportToExcelService], (service: ExportToExcelService) => {
    expect(service).toBeTruthy();
  }));
});
