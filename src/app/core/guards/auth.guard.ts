import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HTTP_CLIENT_SERVICE } from '../../services/dependecy-injection-factory';
import { IHttpClient } from '../../../interfaces/http-client.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(HTTP_CLIENT_SERVICE) private httpService: IHttpClient,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.httpService.get(
      '/user/auth/validate',
      undefined,         
      undefined,         
      true,            
      true               
    ).pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
