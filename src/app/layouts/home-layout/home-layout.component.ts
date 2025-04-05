import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { AvatarModule } from 'primeng/avatar';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../../components/logo-olho/logo-olho.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
    LogoComponent,
    TooltipModule,
    ButtonModule,
    IconFieldModule,
    SidebarModule,
    InputIconModule,
    ToggleSwitchModule,
    MegaMenuModule
  ],
})
export class HomeLayoutComponent extends BaseComponent implements OnInit {
  searchText = '';
  menuItems: MegaMenuItem[] = [];
  sidebarVisible = false;

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
  }

  toggleSidebar(): void {
    this.sidebarVisible = true;
  }

  override toggleTheme(): void {
    super.toggleTheme();
    this.menuItems = this.getMenuItems(); 
  }

  private getMenuItems(): MegaMenuItem[] {
    return [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Alerts',
        icon: 'pi pi-bell',
        routerLink: '/alerts'
      },
      {
        label: 'Applications',
        icon: 'pi pi-building',
        routerLink: '/Applications'
      },
      {
        label: 'kmAI',
        icon: 'pi pi-microchip-ai',
        routerLink: '/kmAI'
      },
      {
        label: 'User Management',
        icon: 'pi pi-user',
        routerLink: '/account-management'
      }
    ];
  }
}
