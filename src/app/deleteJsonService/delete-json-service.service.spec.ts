import { TestBed } from '@angular/core/testing';

import { DeleteJsonServiceService } from './delete-json-service.service';

describe('DeleteJsonServiceService', () => {
  let service: DeleteJsonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteJsonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
