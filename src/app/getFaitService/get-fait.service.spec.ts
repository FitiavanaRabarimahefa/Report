import { TestBed } from '@angular/core/testing';

import { GetFaitService } from './get-fait.service';

describe('GetFaitService', () => {
  let service: GetFaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
