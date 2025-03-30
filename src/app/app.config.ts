import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { HttpClientService } from './services/http-client.service';
import { HTTP_CLIENT_SERVICE } from './services/dependecy-injection-factory';
import { AuthInterceptor } from './core/interceptors/auth.interceptor'; 

import { routes } from './app.routes';
import MeuPreset from './themes/MeuPreset.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MeuPreset,
        options: {
          darkModeSelector: '.modo-escuro'
        }
      }
    }), 
    provideHttpClient(),

    { provide: HTTP_CLIENT_SERVICE, useClass: HttpClientService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
