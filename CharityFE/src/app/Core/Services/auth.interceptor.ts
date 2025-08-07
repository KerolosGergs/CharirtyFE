import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServ } from '../../Auth/Services/auth-serv';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthServ);
  
  // Get the auth token
  const token = authService.getToken();
  
  // Clone the request and add the authorization header if token exists
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Handle the request and catch any errors
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized errors
      if (error.status === 401) {
        // Token might be expired, clear local storage and redirect to login
        authService.logout();
        // You might want to redirect to login page here
        // this.router.navigate(['/login']);
      }
      
      // Return the error
      return throwError(() => error);
    })
  );
}; 