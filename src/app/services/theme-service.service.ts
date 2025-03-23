import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      this.currentTheme = theme;
      localStorage.setItem('theme', theme);
  
      setTimeout(() => {
        document.documentElement.classList.toggle('dark-theme', theme === 'dark');
      }, 100); 
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
