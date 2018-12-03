/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InviteService } from './invite.service';

describe('Service: Invite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InviteService]
    });
  });

  it('should ...', inject([InviteService], (service: InviteService) => {
    expect(service).toBeTruthy();
  }));
});
