import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetCardComponent } from '../custom-widgets/widget-card.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard-numbers',
  standalone: true,
  imports: [RouterModule, CommonModule, WidgetCardComponent, TooltipModule],
  templateUrl: './dashboard-numbers.component.html',
  styleUrls: ['./dashboard-numbers.component.css']
})
export class DashboardNumbersComponent {
  @Input() title = '';
  @Input() count: number = 0;
  @Input() type: 'error' | 'warning' | 'info' = 'info';
  @Input() tooltip?: string;

  get textColorClass(): string {
    return `text-${this.type}`;
  }

  onCardClick() {
    console.log(`Card de ${this.title} clicado`);
  }
}
