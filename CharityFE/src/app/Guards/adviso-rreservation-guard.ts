import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const advisoRreservationGuard: CanActivateFn = () => {
  const _Router = inject(Router);
  
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  
  if (isBrowser) {
    const token = localStorage.getItem('authToken');
    return true;
    if (token) {
      return true;
    } else {
      return _Router.parseUrl('/must-login');
    }
  }

  // If not in browser (SSR), block access
  return _Router.parseUrl('/must-login');
};
