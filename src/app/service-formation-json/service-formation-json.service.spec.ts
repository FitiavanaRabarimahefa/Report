import { TestBed } from '@angular/core/testing';

import { ServiceFormationJsonService } from './service-formation-json.service';

describe('ServiceFormationJsonService', () => {
  let service: ServiceFormationJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFormationJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
