import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { FooterComponent } from '../../components/default-footer/default-foote.component';
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from 'primeng/styleclass';
import { LogoComponent } from '../../components/logo-olho/logo-olho.component';
import { FormControl } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
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
    MatIcon
  ],
  styleUrls: ['./home-layout.component.css'],
  template: `
    <div class="layout-wrapper d-flex flex-column min-vh-100">
        <div style="height: -5vh; padding: 1vh">
        <p-menubar [model]="menuItems" class="shadow-sm px-4 responsive-menubar">
          <ng-template pTemplate="start">
            <div class="d-flex align-items-center gap-4">
              <app-logo-olho class="logo"></app-logo-olho>
              <span *ngFor="let item of menuItems">
                <a [routerLink]="item.routerLink"
                >{{ item.label }}</a>
              </span>
            </div>
          </ng-template>
          <ng-template pTemplate="end">
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
          </ng-template>
        </p-menubar>

        <!-- CONTEÚDO PRINCIPAL -->
        <div class="d-flex flex-grow-1">
          <!-- ÁREA DO COMPONENTE -->
          <main class="content-area flex-grow-1 p-4 bg-black text-white">
            <router-outlet></router-outlet>
          </main>
        </div>

      </div>
    </div>
  `
})
export class HomeLayoutComponent extends BaseComponent{
  menuItems: MenuItem[] = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Alerts', routerLink: '/alerts' },
    { label: 'Enterprises', routerLink: '/enterprises' }
  ];
  searchControl = new FormControl('');

  navigate(path: string) {
    window.location.href = path;
  }
}
