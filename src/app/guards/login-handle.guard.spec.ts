import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginHandleGuard } from './login-handle.guard';

describe('loginHandleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginHandleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
