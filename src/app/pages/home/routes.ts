import { Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../layouts/home-layout/home-layout.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];
