import { InjectionToken } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IHttpClient {
  get<T>(endpoint: string, params?: HttpParams | { [param: string]: string | string[] }, customHeaders?: { [key: string]: string }, requireApiKey?: boolean): Observable<T>;
  post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }, requireApiKey?: boolean): Observable<T>;
  put<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }, requireApiKey?: boolean, queryParams?: { [key: string]: string | number }): Observable<T>;
  delete<T>(endpoint: string, customHeaders?: { [key: string]: string }, requireApiKey?: boolean): Observable<T>;
}
