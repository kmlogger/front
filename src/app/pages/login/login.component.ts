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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormBuilderComponent, 
    BeginLayoutComponent, 
    LogoComponent, 
    CommonModule
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
          [submitButtonLabel]="'Entrar'"
          [extraButtons]="extraButtons"
          (formSubmit)="onLogin($event)">
          <h2 form-title>Realize o Login e continue Monitorando</h2>
        </app-form-builder>
      </div>
    </app-begin-layout>
  `
})
export class LoginComponent extends BaseComponent {  
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
      validators: [Validators.required], 
      errorMessages: {
        required: 'A senha é obrigatória.'
      } as Record<string, string> 
    }
  ];

  extraButtons = [
    { label: 'Esqueceu a senha?', action: new EventEmitter<void>() },
    { label: 'Cadastre-se', action: new EventEmitter<void>() }
  ];

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    snackBar: MatSnackBar, 
    router: Router
  ) {
    super(snackBar, router);

    const controls: Record<string, any> = {};
    this.fields.forEach(field => {
      controls[field.name] = ['', field.validators ?? []];
    });

    this.form = this.fb.group(controls);

    this.extraButtons[0].action.subscribe(() => this.navigateTo('/forgot-password'));
    this.extraButtons[1].action.subscribe(() => this.navigateTo('/sign-up'));
  }

  onLogin(formData: any) {
    if (this.form.invalid) return; 

    this.authService.login(formData).subscribe({
      next: (response) => 
        {
          this.showMessage(response.message, 'success');
          this.navigateTo('/activate-account')
        },
      error: (error) => this.showMessage(error, 'error') 
    });
  }
}
