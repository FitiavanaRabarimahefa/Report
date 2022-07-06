import { TestBed } from '@angular/core/testing';

import { CrgpServiceService } from './crgp-service.service';

describe('CrgpServiceService', () => {
  let service: CrgpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrgpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
