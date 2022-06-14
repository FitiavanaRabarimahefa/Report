import { TestBed } from '@angular/core/testing';

import { GetListInvitationService } from './get-list-invitation.service';

describe('GetListInvitationService', () => {
  let service: GetListInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetListInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
