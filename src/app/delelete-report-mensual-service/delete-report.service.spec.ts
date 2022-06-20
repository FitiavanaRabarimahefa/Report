import { TestBed } from '@angular/core/testing';

import { DeleteReportService } from './delete-report.service';

describe('DeleteReportService', () => {
  let service: DeleteReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
