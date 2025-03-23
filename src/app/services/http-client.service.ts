import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { IHttpClient } from '../../interfaces/http-client.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements IHttpClient {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): HttpHeaders {
    let headersConfig: { [key: string]: string } = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    if (requireApiKey) {
      headersConfig['X-API-KEY'] = this.apiKey;
    }

    return new HttpHeaders(headersConfig);
  }

  private buildUrl(endpoint: string): string {
    return `${this.apiUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }

  get<T>(endpoint: string, params?: HttpParams | { [param: string]: string | string[] }, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.get<T>(url, {
      headers: this.getHeaders(customHeaders, requireApiKey),
      params
    }).pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.post<T>(url, body, {
      headers: this.getHeaders(customHeaders, requireApiKey)
    }).pipe(catchError(this.handleError));
  }

  put<T>(
    endpoint: string,
    body: any,
    customHeaders?: { [key: string]: string },
    requireApiKey: boolean = true,
    queryParams?: { [key: string]: string | number }
  ): Observable<T> {
    const url = this.buildUrl(endpoint);

    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        params = params.set(key, queryParams[key].toString());
      });
    }

    return this.http.put<T>(url, body, {
      headers: this.getHeaders(customHeaders, requireApiKey),
      params
    }).pipe(catchError(this.handleError));
  }
  delete<T>(endpoint: string, customHeaders?: { [key: string]: string }, requireApiKey: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.delete<T>(url, {
      headers: this.getHeaders(customHeaders, requireApiKey)
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);
  
    if (error.error && typeof error.error === 'object') {
      return throwError(() => error.error); 
    } 
  
    // Caso contrário, cria um erro genérico
    return throwError(() => ({
      statuscode: error.status,
      message: error.error || 'Erro desconhecido',
    }));
  }
}
