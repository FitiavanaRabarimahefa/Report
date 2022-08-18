import { TestBed } from '@angular/core/testing';

import { GetFormationService } from './get-formation.service';

describe('GetFormationService', () => {
  let service: GetFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
