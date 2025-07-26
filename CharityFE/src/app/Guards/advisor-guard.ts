import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServ } from '../Auth/Services/auth-serv';

export const advisorGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthServ);
  const router = inject(Router);

  const role = authServ.getRole();

  if (role === 'Advisor') {
    return true;
  }

  router.navigate(['/must-login']);
  return false;
};
