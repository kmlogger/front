import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const payload = this.decodeToken(token);
    const expired = payload?.exp && (Date.now() / 1000) > payload.exp;

    if (expired) {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }
}
