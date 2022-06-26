import { TestBed } from '@angular/core/testing';

import { SaveMongoService } from './save-mongo.service';

describe('SaveMongoService', () => {
  let service: SaveMongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveMongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
