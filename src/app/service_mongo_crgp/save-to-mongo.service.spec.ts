import { TestBed } from '@angular/core/testing';

import { SaveToMongoService } from './save-to-mongo.service';

describe('SaveToMongoService', () => {
  let service: SaveToMongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveToMongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
