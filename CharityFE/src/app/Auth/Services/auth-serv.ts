import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServ {

  private tokenKey = 'authToken';
  private userKey = 'userInfo';
  private roleKey = 'userRole';

  setSession(token: string, user: any, role: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    localStorage.setItem(this.roleKey, role);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token!;
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}