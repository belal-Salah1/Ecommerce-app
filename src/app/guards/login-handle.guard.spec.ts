import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, Router, RouterStateSnapshot } from '@angular/router';

import { loginHandleGuard } from './login-handle.guard';
import { AuthService } from '../services/auth.service';

describe('loginHandleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => loginHandleGuard(...guardParameters));

    let MockAuthService: jasmine.SpyObj<AuthService>;
    let _router:Router;
    let route:ActivatedRouteSnapshot;
    let state:RouterStateSnapshot;

    beforeEach(() => {
      MockAuthService = jasmine.createSpyObj('AuthService',['getLogState']);
      route = {} as ActivatedRouteSnapshot;
      state = {} as RouterStateSnapshot;
    TestBed.configureTestingModule({
      providers:[provideRouter([]),{provide:AuthService,useValue:MockAuthService}]
    });
    _router = TestBed.inject(Router)
    spyOn(_router,'navigate')
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should GetLogState to have been called',()=>{
    MockAuthService.getLogState.and.returnValue(true)
    expect(executeGuard(route,state)).toBe(false)
    expect(MockAuthService.getLogState).toHaveBeenCalled();

  })
  it('should return false if user is logged in',()=>{
    MockAuthService.getLogState.and.returnValue(true)
    expect(executeGuard(route,state)).toBe(false)
  })
  it('should return true if user is not logged in',()=>{
    MockAuthService.getLogState.and.returnValue(false)
    expect(executeGuard(route,state)).toBe(true)
  })
});
