import { TestBed } from '@angular/core/testing';

import { SendAdminMailService } from './send-admin-mail.service';

describe('SendAdminMailService', () => {
  let service: SendAdminMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendAdminMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
