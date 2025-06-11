import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginHandleGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService)
  let logState = _authService.getLogState();
  if(logState){
    return false;
  }else{
    return true
  }
};
