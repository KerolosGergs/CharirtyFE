import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServ } from '../Auth/Services/auth-serv';

export const advisoRreservationGuard: CanActivateFn = () => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthServ);
  
  
    const token = _AuthService.getToken();
    // return true;
    if (token) {
      return true;
    } else {
      return _Router.parseUrl('/must-login');
    }
  

  // If not in browser (SSR), block access
  return _Router.parseUrl('/must-login');
};
