import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-center-content text-center">
      <h2 class="fw-bold">Welcome to the KMLogger Home Page</h2>
      <p>This is a placeholder for the main dashboard widgets or components.</p>
    </div>
  `,
  styles: [
    `
    .home-center-content {
      padding: 2rem;
    }
  `
  ]
})
export class HomeComponent {}
