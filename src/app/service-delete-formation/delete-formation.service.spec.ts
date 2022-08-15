import { TestBed } from '@angular/core/testing';

import { DeleteFormationService } from './delete-formation.service';

describe('DeleteFormationService', () => {
  let service: DeleteFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
