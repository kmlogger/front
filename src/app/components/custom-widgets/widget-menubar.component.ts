// src/app/components/custom-widgets/widget-menubar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-menubar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-wrapper" [ngClass]="wrapperClass">
      <div class="widget-header" *ngIf="showHeader">
        <ng-content select="[widget-header]"></ng-content>
      </div>
      <div class="widget-content" [ngClass]="contentClass">
        <ng-content select="[widget-content]"></ng-content>
      </div>
      <div class="widget-footer" *ngIf="showFooter">
        <ng-content select="[widget-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
    }

    .glass-wrapper {
      background: linear-gradient(145deg, rgba(155, 81, 224, 0.15), rgba(54, 0, 120, 0.15));
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 1rem 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      color: var(--text-color);
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    .widget-header,
    .widget-content,
    .widget-footer {
    }
  `]
})
export class WidgetMenuBarComponent {
  @Input() wrapperClass = '';
  @Input() contentClass = '';
  @Input() showHeader = true;
  @Input() showFooter = true;
}
