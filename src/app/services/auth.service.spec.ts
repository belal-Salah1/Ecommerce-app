import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should log in ',()=>{
    service.logIn()
    expect(service.logState).toBe(true)
    expect(service.getLogState()).toBe(true)
  })
  it('should log out ',()=>{
    service.logOut()
    expect(service.logState).toBe(false)
    expect(service.getLogState()).toBe(false)
  })
});
