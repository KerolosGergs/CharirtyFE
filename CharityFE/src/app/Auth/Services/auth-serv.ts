import { Observable } from 'rxjs';
import { ForgetPassword } from './../Components/forget-password/forget-password';
import { Injectable } from '@angular/core';
import { GeneralResponse } from '../../Core/Interfaces/ILibrary/ilibrary';

@Injectable({
  providedIn: 'root'
})
export class AuthServ {
 private tokenKey = 'authToken';
  private userKey = 'userInfo';
  private roleKey = 'userRole';
  private RoleId = 'RoleId';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setSession(token: string, user: any, role: string, RoleId: number): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      localStorage.setItem(this.roleKey, role);
    localStorage.setItem(this.RoleId, RoleId?.toString() ?? '0'); // ✅ Safe check
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }
getUserInfo(): { id: string | null; fullName: string | null } {
  if (this.isBrowser()) {
    const userData = localStorage.getItem(this.userKey); // assuming you store the JSON under "user"
    if (userData) {
      const user = JSON.parse(userData);
      return {
        id: user.id || null,
        fullName: user.fullName || null
      };
    }
  }
  return { id: null, fullName: null };
}

  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
getUserName(): string | null {
  const user = this.getUserInfo();
  return user.fullName;
}
getUserID(): string | null {
  const user = this.getUserInfo();
  return user.id;
}
getId(): number  {
  if (this.isBrowser()) {
    const RoleId = localStorage.getItem(this.RoleId);
    const parsed = Number(RoleId);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}


  getRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
 
}