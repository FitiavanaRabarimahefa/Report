import { TestBed } from '@angular/core/testing';

import { SendjsonserviceService } from './sendjsonservice.service';

describe('SendjsonserviceService', () => {
  let service: SendjsonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendjsonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
