import { isPlatformBrowser } from '@angular/common';
import { Directive, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';

@Directive()
export abstract class BaseComponent {
    private _isDarkTheme: boolean = false;

    constructor(
        protected snackBar?: MatSnackBar,
        protected router?: Router,
        @Inject(PLATFORM_ID) protected platformId: Object = 'browser'
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this._isDarkTheme = localStorage.getItem('theme') === 'dark';
            this.applyThemeClass();
        }
    }

    public get isDarkTheme(): boolean {
        return this._isDarkTheme;
    }

    public toggleTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            this._isDarkTheme = !this._isDarkTheme;
            localStorage.setItem('theme', this._isDarkTheme ? 'dark' : 'light');
            this.applyThemeClass();
        }
    }

    private applyThemeClass(): void {
        const element = document.documentElement;
        if (this._isDarkTheme) {
            element.classList.add('modo-escuro');
        } else {
            element.classList.remove('modo-escuro');
        }
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
