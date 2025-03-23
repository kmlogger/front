import { Directive } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Directive()
export abstract class BaseComponent {

  constructor(protected snackBar: MatSnackBar, protected router: Router) {}

  showMessage(response: any, type?: 'success' | 'error' | 'warning') {
    let message = '';
  
    if (response?.notifications && Array.isArray(response.notifications)) {
      message = response.notifications.map((n: { key: string; message: string }) => n.message).join('\n');
    } else if (typeof response === 'string') {
      message = response;
    } else {
      message = response?.message ?? 'Ocorreu um erro inesperado.';
    }
  
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: type ? [`snackbar-${type}`] : [],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  protected navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
