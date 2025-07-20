import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServ } from '../Auth/Services/auth-serv';

export const authGuard: CanActivateFn = (route, state) => {
   const _Router= inject(Router)

  
  // const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  const Autser = inject(AuthServ);
  

    const token = Autser.getToken();

    if (token) {
      return true;
    } else {
      return _Router.parseUrl('/login');
    }
  


};
