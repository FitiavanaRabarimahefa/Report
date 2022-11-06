import { TestBed } from '@angular/core/testing';

import { SearchReportService } from './search-report.service';

describe('SearchReportService', () => {
  let service: SearchReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
