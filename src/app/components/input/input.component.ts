import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, NgxMaskDirective],
  template: `
    <div class="custom-input-wrapper">
      <label *ngIf="label" class="input-label">{{ label }}</label>

      <input
        pInputText
        class="custom-input"
        [formControl]="control"
        [type]="type"
        [placeholder]="placeholder"
        [mask]="mask"
        [ngClass]="{ 'invalid': control.invalid && (control.dirty || control.touched) }"
      />

      <div *ngIf="control.invalid && (control.dirty || control.touched)" class="error-messages">
        <ng-container *ngFor="let errorKey of errorKeys()">
          <small class="error-text">{{ errorMessages?.[errorKey] }}</small>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .custom-input-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 15px;
    }

    .input-label {
      margin-bottom: 0.25rem;
      font-size: 0.85rem;
      color: var(--text-color);
    }

    .custom-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--p-primary-400);
      border-radius: 6px;
      background-color: var(--input-background);
      color: var(--input-text);
      transition: border-color 0.2s;
    }

    .custom-input:focus {
      border-color: var(--p-primary-400);
      box-shadow: 0 0 0 0.2rem rgba(123, 0, 255, 0.25);
      outline: none;
    }

    .custom-input.invalid {
      border-color: #d32f2f !important;
    }

    .error-text {
      color: #d32f2f;
      font-size: 0.75rem;
    }

    .error-messages {
      margin-top: 0.25rem;
    }
  `]
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() mask?: string;
  @Input() errorMessages?: { [key: string]: string };

  errorKeys(): string[] {
    return this.control.errors ? Object.keys(this.control.errors) : [];
  }
}
