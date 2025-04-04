import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
    LogoComponent,
    TooltipModule,
    MegaMenuModule
  ],
})
export class HomeLayoutComponent extends BaseComponent {
  searchText = '';

  menuItems: MegaMenuItem[] = [
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
      icon: 'pi pi-database',
      routerLink: '/kmAI'
    },
    {
      label: 'Toggle Theme',
      icon: this.isDarkTheme ? 'pi pi-sun' : 'pi pi-moon',
      command: () => this.toggleTheme()
    }
  ];
}
