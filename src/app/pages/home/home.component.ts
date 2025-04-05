import { Component } from '@angular/core';
import { HomeLayoutComponent } from "../../layouts/home-layout/home-layout.component";
import { DashboardNumbersComponent } from "../../components/application-dashboard-card/dashboard-numbers.component";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
   <div class="home-left-side-component">
      <h2 class="dashboard-section-title">Hoje</h2>

      <app-dashboard-numbers
        title="Erros"
        type="error"
        [count]="234"
        tooltip="Quantidade total de erros"
      />

      <app-dashboard-numbers
        title="Avisos"
        type="warning"
        [count]="125"
        tooltip="Quantidade total de avisos"
      />

      <app-dashboard-numbers
        title="Informações"
        type="info"
        [count]="582"
        tooltip="Quantidade total de informações"
      />
    </div>
  `,
  styles: [
    `
    .home-center-content {
      padding: 2rem;
    }

    .home-left-side-component {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 2rem;
      max-width: 300px;
      align-items: flex-start;
    }

    .dashboard-section-title {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
      font-weight: 600;
    }
    /* Responsivo para mobile */
    @media (max-width: 768px) {
      .home-left-side-component {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  `
  ],
  imports: [HomeLayoutComponent, DashboardNumbersComponent]
})
export class HomeComponent {
  errorCount = 234;
  warningCount = 125;
  infoCount = 582;
}
