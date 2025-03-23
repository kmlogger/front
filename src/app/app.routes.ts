import { Routes } from '@angular/router';
import { BeginLayoutComponent } from './layouts/begin-layout/begin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { ActivatePasswordComponent } from './pages/activate-password/activate-password.component';

export const routes: Routes = [
  {
    path: '',
    component: BeginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'activate-account', component: ActivateAccountComponent },
      { path: 'forgot-password-activate', component: ActivatePasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }
    ]
  }
];
