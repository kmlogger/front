import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isDarkMode(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return localStorage.getItem(this.THEME_KEY) === 'dark';
  }

  toggleTheme(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const isDark = this.isDarkMode();
    const newTheme = isDark ? 'light' : 'dark';

    localStorage.setItem(this.THEME_KEY, newTheme);
    this.applyThemeClass(newTheme);

    return newTheme === 'dark';
  }

  applyInitialTheme(): void {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    this.applyThemeClass(theme);
  }

  private applyThemeClass(theme: 'light' | 'dark'): void {
    const html = this.document.documentElement;
    html.classList.remove('modo-escuro');

    if (theme === 'dark') {
      html.classList.add('modo-escuro');
    }
  }
}
