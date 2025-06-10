import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService:AuthService = inject(AuthService)
  const logState = _authService.getLogState()
  const _router = inject(Router)
  if(logState){
    return true
  }else{
    _router.navigate(['/userLogin'])
    return false
  };

}
