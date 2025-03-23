import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { FormBuilderComponent } from '../../components/form-builder/form-builder.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeginLayoutComponent } from "../../layouts/begin-layout/begin-layout.component";
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { passwordMatchValidator } from '../../shared/validators/password-match.directive';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormBuilderComponent,
    BeginLayoutComponent,
    LogoComponent,
    CommonModule,
    NgxMaskDirective
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
          [submitButtonLabel]="'Cadastrar'"
          [extraButtons]="extraButtons"
          (formSubmit)="onSignUp($event)">
          <h2 form-title>Crie sua conta</h2>
        </app-form-builder>
      </div>
    </app-begin-layout>
  `,
   providers: [provideNgxMask()]
})
export class SignUpComponent extends BaseComponent {
  form: FormGroup;

  fields = [
    {
      name: 'firstName',
      label: 'Nome',
      type: 'text',
      required: true,
      validators: [Validators.required],
      errorMessages: {
        required: 'O Nome é obrigatório.'
      } as Record<string, string>
    },
    {
      name: 'lastName',
      label: 'Sobrenome',
      type: 'text',
      required: true,
      validators: [Validators.required],
      errorMessages: {
        required: 'O Sobrenome é obrigatório.'
      } as Record<string, string>
    },
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
      name: 'phoneNumber',
      label: 'Número de Telefone',
      type: 'tel',
      required: true,
      mask: '(00) 00000-0000',
      validators: [Validators.required, Validators.pattern(/^\d{10,11}$/)],
      errorMessages: {
        required: 'O Telefone é obrigatório.',
        pattern: 'Número de telefone inválido. Use 10 ou 11 dígitos.'
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
      validators: [Validators.required , Validators.minLength(6), ],
      errorMessages: {
        required: 'A confirmação da senha é obrigatória.',
        passwordMismatch: 'As senhas não coincidem.'
      } as Record<string, string>
    }
  ];

  extraButtons = [
    { label: 'Já tem conta?', action: new EventEmitter<void>() }
  ];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    router: Router
  ) {
    super(snackBar, router);

    const controls: any = {};
    this.fields.forEach(field => {
      controls[field.name] = ['', field.validators || []];
    });

    this.form = this.fb.group(controls, { validators: passwordMatchValidator('password', 'confirmPassword') });

    this.extraButtons[0].action.subscribe(() => this.navigateTo('/login'));
  }

  onSignUp(formData: any) {
    if (this.form.invalid) return;

    this.authService.register(formData).subscribe({
      next: (response) =>    {
        this.showMessage(response.message, 'success');
      },
      error: (error) => this.showMessage(error, 'error')
    });
  }
}
