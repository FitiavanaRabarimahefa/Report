import { TestBed } from '@angular/core/testing';

import { DeleteCrgpService } from './delete-crgp.service';

describe('DeleteCrgpService', () => {
  let service: DeleteCrgpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCrgpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
