import { Component, EventEmitter } from '@angular/core';
import { FormBuilderComponent } from '../../components/form-builder/form-builder.component';
import { BeginLayoutComponent } from '../../layouts/begin-layout/begin-layout.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { passwordMatchValidator } from '../../shared/validators/password-match.directive';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormBuilderComponent,
    BeginLayoutComponent,
    LogoComponent,
    CommonModule,
    MatFormFieldModule
  ],
  template: `
    <app-begin-layout>
      <div class="login-container">
        <div class="logo-container">
          <app-logo></app-logo>
        </div>

        <app-form-builder
          [fields]="fields"
          [form]="form"
          [submitButtonLabel]="'Recuperar Senha'"
          [extraButtons]="extraButtons"
          (formSubmit)="onForgotPassword($event)">
          <h2 form-title>Recupere sua senha</h2>
        </app-form-builder>
      </div>
    </app-begin-layout>
  `
})
export class ForgotPasswordComponent extends BaseComponent {

  form: FormGroup;

  fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: [Validators.required, Validators.email],
      errorMessages: {
        required: 'O Email é obrigatório.',
        email: 'O Email informado é inválido.'
      } as Record<string, string>
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      required: true,
      validators: [Validators.required, Validators.minLength(6)],
      errorMessages: {
        required: 'A senha é obrigatória.',
        minLength: 'A senha deve ter pelo menos 6 caracteres.'
      } as Record<string, string>
    },
    {
      name: 'confirmPassword',
      label: 'Confirme a Senha',
      type: 'password',
      required: true,
      validators: [Validators.required],
      errorMessages: {
        required: 'A confirmação da senha é obrigatória.',
        passwordMismatch: 'As senhas não coincidem.'
      } as Record<string, string>
    }
  ];

  extraButtons = [
    { label: 'Cadastre-se', action: new EventEmitter<void>() }
  ];


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    router: Router
  ) {
    super(snackBar, router);

    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator('password', 'confirmPassword') }
    );

    this.extraButtons[0].action.subscribe(() => this.navigateTo('/sign-up'));
  }

  onForgotPassword(formData: any) {
    if (this.form.invalid) return;

    this.authService.forgotPassword(formData.email).subscribe({
      next: (response) => {
        this.showMessage(response, 'success');
        this.router.navigate(['/forgot-password-activate'], { queryParams: { email: formData.email } });
      },
      error: (error) => this.showMessage(error, 'error')
    });
  }
}
