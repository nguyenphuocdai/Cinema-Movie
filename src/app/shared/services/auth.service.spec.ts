import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-service.service';

describe('AuthServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
