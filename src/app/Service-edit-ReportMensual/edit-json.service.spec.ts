import { TestBed } from '@angular/core/testing';

import { EditJsonService } from './edit-json.service';

describe('EditJsonService', () => {
  let service: EditJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
