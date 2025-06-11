import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

fdescribe('authGuard', () => {
  let MockAuthService:jasmine.SpyObj<AuthService>
  let _router:Router
  let route:ActivatedRouteSnapshot
  let state:RouterStateSnapshot

  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
     route = {} as ActivatedRouteSnapshot
     state = {} as RouterStateSnapshot
    MockAuthService = jasmine.createSpyObj('AuthService',['getLogState'])
    TestBed.configureTestingModule({
      providers:[provideRouter([]),{provide:AuthService,useValue:MockAuthService}]
    });
    _router = TestBed.inject(Router)
    spyOn(_router,'navigate')


  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should getLogState from the service',()=>{
    MockAuthService.getLogState.and.returnValue(true)
    expect(executeGuard(route,state)).toBe(true)
    expect(MockAuthService.getLogState).toHaveBeenCalled()

  })
  it('should return true if user is loggedIn',()=>{
    MockAuthService.getLogState.and.returnValue(true)
    expect(executeGuard(route,state)).toBe(true)
  })
  it("should return false if user isn't loggedIn",()=>{
    MockAuthService.getLogState.and.returnValue(false)
    expect(executeGuard(route,state)).toBe(false)
    expect(_router.navigate).toHaveBeenCalledWith(['/userLogin'])
  })
});

