import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MatIcon } from '@angular/material/icon';

import { FooterComponent } from '../../components/default-footer/default-foote.component';
import { LogoComponent } from '../../components/logo-olho/logo-olho.component';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { WidgetCardComponent } from '../../components/custom-widgets/widget-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    FooterComponent,
    TooltipModule,
    StyleClassModule,
    LogoComponent,
    AvatarModule,
    AvatarGroupModule,
    MatIcon,
    WidgetCardComponent
  ],
  styles: [`
    .custom-menubar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
    }

    .left-side {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .menu-links {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      align-items: center;
      justify-content: flex-start;
    }

    .menu-link {
      font-weight: 600;
      color: var(--p-primary-300);
      text-decoration: none;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      padding: 0.25rem 0.5rem;
      transition: color 0.2s ease-in-out;
    }

    .menu-link:hover {
      color: var(--p-primary-100);
    }

    .menu-link .dot {
      width: 6px;
      height: 6px;
      background-color: var(--p-primary-400);
      border-radius: 50%;
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .menu-link:hover .dot {
      transform: scale(1.5);
    }

    .theme-toggle-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      height: 40px;
      width: 40px;
      border: none;
      cursor: pointer;
      color: var(--p-primary-400);
    }
  `],
  template: `
    <div class="layout-wrapper d-flex flex-column min-vh-100">
      <div class="custom-menubar">
        <div class="left-side">
          <app-logo-olho class="logo"></app-logo-olho>
          <app-widget-card
            class="menu-widget"
            [wrapperClass]="'d-flex align-items-center'"
            [contentClass]="'menu-links'"
            [showHeader]="false"
            [showFooter]="false"
          >
            <div widget-content>
              <a 
                *ngFor="let item of menuItems"
                [routerLink]="item.routerLink"
                class="menu-link"
                routerLinkActive="active"
              >
      <span class="dot"></span> {{ item.label }}
    </a>
  </div>
</app-widget-card>
        </div>

        <div class="header-right-container">
          <button mat-icon-button (click)="toggleTheme()" class="theme-toggle-button">
            <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          <p-avatar 
            label="K"
            styleClass="mr-2"
            size="large"
            [style]="{
              'background-color': 'var(--p-primary-200)', 
              'color': 'var(--p-primary-400)'
            }"
            shape="circle"
          />
        </div>
      </div>

      <div class="d-flex flex-grow-1">
        <main class="content-area flex-grow-1 p-4 bg-black text-white">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class HomeLayoutComponent extends BaseComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Alerts', routerLink: '/alerts' },
    { label: 'Enterprises', routerLink: '/enterprises' }
  ];

  searchControl = new FormControl('');
}

