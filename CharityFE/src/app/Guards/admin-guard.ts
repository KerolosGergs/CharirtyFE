import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServ } from '../Auth/Services/auth-serv';

export const adminGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthServ);
  const router = inject(Router);

  const role = authServ.getRole();

  if (role === 'Admin') {
    return true;
  }

  router.navigate(['/must-login']);
  return false;
};
