import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { BeginLayoutComponent } from "../../layouts/begin-layout/begin-layout.component";
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-activate-account',
  template: `
    <app-begin-layout>
      <div class="container">
        <div class="content">
          <div class="logo-container">
            <app-logo></app-logo>
          </div>
          <h2>Ativando sua conta...</h2>
        </div>
      </div>
    </app-begin-layout>
  `,
  styleUrls: ['./activate-account.component.css'],
  standalone: true,
  imports: [BeginLayoutComponent, LogoComponent]
})
export class ActivateAccountComponent extends BaseComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    snackBar: MatSnackBar,  
    router: Router          
  ) {
    super(snackBar, router); 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];

      if (!email || !token) {
        this.showMessage("Parâmetros inválidos!", "error");
        this.navigateTo('/');
        return;
      }

      this.authService.activate({ email: email, code: token}, "/activate").subscribe({
        next: (response) => {
          this.showMessage("Conta ativada com sucesso!", "success");
          setTimeout(() => this.navigateTo('/login'), 2000);
        },
        error: (error) => {
          this.showMessage("Erro ao ativar conta.", "error");
          this.navigateTo('/');
        }
      });
    });
  }
}
