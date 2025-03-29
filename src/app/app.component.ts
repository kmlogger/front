import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeService } from './services/theme-service.service';
import { isPlatformBrowser } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    MatSnackBarModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}