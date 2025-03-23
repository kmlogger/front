import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpClient } from '../../interfaces/http-client.interface';
import { HTTP_CLIENT_SERVICE } from './dependecy-injection-factory';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private endpoint = 'user';

  constructor(@Inject(HTTP_CLIENT_SERVICE) private httpService: IHttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpService.post(this.endpoint + "/login", credentials, {}, true);
  }

  register(credentials: {email:string, firstName: string, lastName: string,
    password: string, phoneNumber: string }): Observable<any> {
    return this.httpService.post(this.endpoint + "/register", credentials, {}, true);
  }

  activate(credentials: { email: string, code: any }, finalEndpoint: string): Observable<any> {
    return this.  httpService.put(
      this.endpoint + finalEndpoint,
      null,
      {},
      true,
      { email: credentials.email, code: credentials.code }
    );
  }

  forgotPassword(email: string){
    return this.httpService.put(this.endpoint + "/forgot-password", { email }, {}, true);
  }

  resendCode(email: string){
    return this.httpService.put(this.endpoint + "/resend-code", { email }, {}, true);
  }
}
