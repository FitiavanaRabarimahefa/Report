import { TestBed } from '@angular/core/testing';

import { ServiceFormationService } from './service-formation.service';

describe('ServiceFormationService', () => {
  let service: ServiceFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
