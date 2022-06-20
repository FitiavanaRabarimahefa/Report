import { TestBed } from '@angular/core/testing';

import { GetReportMongoService } from './get-report-mongo.service';

describe('GetReportMongoService', () => {
  let service: GetReportMongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReportMongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
