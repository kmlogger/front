import { isPlatformBrowser } from '@angular/common';
import { Directive, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';
import { ThemeService } from '../../services/theme-service.service';

@Directive()
export abstract class BaseComponent {
  constructor(
    protected snackBar?: MatSnackBar,
    protected router?: Router,
    @Inject(PLATFORM_ID) protected platformId: Object = 'browser',
    protected themeService?: ThemeService
  ) {
    // Aplica o tema salvo no load
    this.themeService?.applyInitialTheme();
  }

  public get isDarkTheme(): boolean {
    return this.themeService?.isDarkMode() ?? false;
  }

  public toggleTheme(): void {
    const isNowDark = this.themeService?.toggleTheme();
    console.log(`Tema trocado para: ${isNowDark ? 'dark' : 'light'}`);
  }

  protected navigateTo(route: string) {
    this.router?.navigate([route]);
  }

  protected navigateToWithParams(route: string, queryParams: NavigationExtras) {
    this.router?.navigate([route], queryParams);
  }

  showMessage(response: any, type?: 'success' | 'error' | 'warning') {
    if (!this.snackBar) return;

    let message = '';

    if (response?.notifications && Array.isArray(response.notifications)) {
      message = response.notifications.map((n: { key: string; message: string }) => n.message).join('\n');
    } else if (typeof response === 'string') {
      message = response;
    } else {
      message = response?.message ?? 'Ocorreu um erro inesperado.';
    }

    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: type ? [`snackbar-${type}`] : [],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
