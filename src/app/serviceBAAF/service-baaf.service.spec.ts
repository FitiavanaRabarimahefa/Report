import { TestBed } from '@angular/core/testing';

import { ServiceBAAFService } from './service-baaf.service';

describe('ServiceBAAFService', () => {
  let service: ServiceBAAFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBAAFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
