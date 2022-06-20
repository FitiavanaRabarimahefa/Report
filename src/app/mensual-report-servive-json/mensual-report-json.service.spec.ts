import { TestBed } from '@angular/core/testing';

import { MensualReportJsonService } from './mensual-report-json.service';

describe('MensualReportJsonService', () => {
  let service: MensualReportJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensualReportJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
