import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="text-center py-3 border-top small text-muted bg-dark text-white">
      &copy; 2025 <strong>KMLogger</strong>. All rights reserved.
    </footer>
  `,
  styles: [`
    footer {
      font-size: 0.85rem;
      margin-bottom: 0;
    }
  `]
})
export class FooterComponent {}