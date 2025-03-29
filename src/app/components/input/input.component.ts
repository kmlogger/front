import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule],
  template: `
    <div class="input-wrapper">
      <label *ngIf="label" class="input-label">{{ label }}</label>
      <input
        pInputText
        [formControl]="control"
        [placeholder]="placeholder"
        [type]="type"
        class="themed-input"
      />
    </div>
  `,
  styles: [`
    .custom-input-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
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
  
    ::ng-deep .p-inputtext {
      background: var(--input-background) !important;
      color: var(--input-text) !important;
      border: 1px solid var(--p-primary-400) !important;
    }
  
    ::ng-deep .p-inputtext:focus {
      border-color: var(--p-primary-400) !important;
      box-shadow: 0 0 0 0.2rem rgba(123, 0, 255, 0.25);
    }
  `]
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
}
