import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { HttpClientService } from './services/http-client.service';
import { routes } from './app.routes';
import { HTTP_CLIENT_SERVICE } from './services/dependecy-injection-factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: Aura
      }
    }), 
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: HTTP_CLIENT_SERVICE, useClass: HttpClientService }
  ]
};
