import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  return of(null).pipe(
    map(() => {
      const isAuthenticated = authService.getLogState();
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
