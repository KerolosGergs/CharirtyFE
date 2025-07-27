import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServ {
 private tokenKey = 'authToken';
  private userKey = 'userInfo';
  private roleKey = 'userRole';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setSession(token: string, user: any, role: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      localStorage.setItem(this.roleKey, role);
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
  // const token = localStorage.getItem('token');
  // if (!token) return null;

  // const payload = JSON.parse(atob(token.split('.')[1]));
  // return payload?.userId ?? null;
  return 10;
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