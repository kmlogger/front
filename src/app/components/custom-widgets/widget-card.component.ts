import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-widget-card',
    standalone: true,
    imports: [CommonModule],
    template: `
      <div class="glass-wrapper">
        <div class="widget-header">
          <ng-content select="[widget-header]"></ng-content>
        </div>
        <div class="widget-content">
          <ng-content select="[widget-content]"></ng-content>
        </div>
        <div class="widget-footer">
          <ng-content select="[widget-footer]"></ng-content>
        </div>
      </div>
    `,
    styles: [`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }
  
      .glass-wrapper {
        background: linear-gradient(145deg, rgba(155, 81, 224, 0.15), rgba(54, 0, 120, 0.15));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        color: var(--text-color);
        width: 100%;
        max-width: 550px; 
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
  
      .widget-header,
      .widget-content,
      .widget-footer {
        width: 100%;
      }

      .widget-header {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        }
    `]
  })
  
export class WidgetCardComponent {}
