import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
  * Valida se os campos de senha e confirmação de senha são iguais.
 * @param passwordKey Chave do campo da senha.
 * @param confirmPasswordKey Chave do campo de confirmação.
 */
export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;

    // Retorna erro se as senhas forem diferentes
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
};
