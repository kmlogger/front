import { Component, Output, EventEmitter, OnInit, Input, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CodeInputComponent } from '../code-input/code-input.component';


@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CodeInputComponent
  ],
  template: `
    <div class="form-card">
      <mat-card>
        <mat-card-title>
          <ng-content select="[form-title]"></ng-content>
        </mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <ng-container *ngFor="let field of fields">
            <mat-form-field *ngIf="field.type !== 'code'" appearance="outline">
              <mat-label>{{ field.label }}</mat-label>
              
              <!-- 🔹 Campo SEM máscara -->
              <input
                *ngIf="!field.mask"
                matInput
                [type]="field.type || 'text'"
                [formControlName]="field.name"
                [required]="!!field.required"
              />

              <!-- 🔹 Campo COM máscara -->
              <input
                *ngIf="field.mask"
                matInput
                [type]="field.type || 'text'"
                [formControlName]="field.name"
                [required]="!!field.required"
                [mask]="field.mask"
              />

              <mat-error *ngFor="let error of getErrors(field.name)">
                {{ error }}
              </mat-error>
            </mat-form-field>
            <app-code-input *ngIf="field.type === 'code'" [formControlName]="field.name"></app-code-input>
          </ng-container>


          <div class="button-container">
              <button  mat-button type="submit" [disabled]="form.invalid">
              {{ submitButtonLabel }}
            </button>

              <button
                *ngFor="let extraButton of extraButtons"
                mat-button
                (click)="extraButton.action.emit()">
                {{ extraButton.label }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
      .form-card mat-card {
        background: transparent;
        border: 2px solid var(--primary-color);
        border-radius: 12px;
        backdrop-filter: blur(10px);
        padding: 20px;
        text-align: center;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        max-width: 100vh;
        width: 60vh;
    }

      mat-card-title {
      font-size: 14px;
      color: var(--title-color);
    }
    .mdc-text-field--outlined .mdc-notched-outline {
    border-color: var(--primary-color) !important;
    transition: border-color 0.3s ease-in-out;
    }

    .mdc-text-field--focused .mdc-notched-outline {
        border-color: var(--secondary-color) !important;
    }

    .mat-mdc-form-field-infix {
        padding: 12px 16px !important;
        height: 48px !important;
        display: flex;
        align-items: center !important;
        box-sizing: border-box; /* Evita que o padding altere o tamanho do input */
        border-color: black !important;
    }

    .mdc-text-field__input {
        padding-left: 10px !important;
        text-align: left !important;
    }


    ::ng-deep .mat-mdc-input-element {
    color: var(--text-color);
    caret-color: var(--text-color) !important;
    }
    .mdc-text-field--invalid .mdc-notched-outline {
        border-color: #d32f2f !important; 
    }

    mat-form-field {
        width: 100%;
        margin-bottom: 15px;
        color: var(--text-color);
    }

    input.mat-input-element {
        background: transparent !important;
        border-bottom: 2px solid #7B00FF !important;
        color: red !important;
        caret-color: white !important;
        opacity: 1 !important;
    }

    mat-error {
      margin-top: 1%;
      font-size: 80% !important;
      color: #d32f2f !important;
    }

    .mat-form-field-appearance-outline .mat-form-field-outline {
    border-color: var(--primary-color) !important;
    }

    .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline {
    border-color: var(--secondary-color) !important; /* Ajuste para quando o input estiver ativo */
    }

    /* Quando houver erro no campo */
    .mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline {
        border-color: #d32f2f !important; /* Vermelho para erro */
    }
    
    .mat-input-element {
    padding: 10px !important;
    height: 40px !important;
    line-height: normal !important;
    text-align: left !important; /* Alinha corretamente o texto */
    box-sizing: border-box; /* Garante que padding não altere a altura */
    }

    .mat-form-field-flex {
    align-items: center !important;
}

    ::ng-deep input.mat-input-element[disabled],
    ::ng-deep input.mat-input-element:disabled {
        opacity: 1 !important;
        color: white !important;
    }


    ::ng-deep .mat-form-field.mat-focused .mat-form-field-label {
        color: #7B00FF !important;
    }

    button {
        background: #6200ea;
        color: white !important;
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        transition: 0.3s ease;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        color: var(--primary-color);
    }
  `],
   providers: [provideNgxMask()]
})

export class FormBuilderComponent implements OnInit {
  @Input() title: string = 'Formulário';
  @Input() fields: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    mask?: string;
    validators?: ValidatorFn[];
    errorMessages?: { [key: string]: string };
  }[] = [];

  @Input() form!: FormGroup;
  @Input() submitButtonLabel: string = 'Enviar';
  @Input() extraButtons: { label: string; action: EventEmitter<void> }[] = [];

  @Output() formSubmit = new EventEmitter<any>();

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

    getErrors(fieldName: string): string[] {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !this.fields) return [];

    const field = this.fields.find(f => f.name === fieldName);
    if (!field || !field.errorMessages) return [];

    return Object.keys(control.errors)
      .map(errorKey => field.errorMessages?.[errorKey])
      .filter(msg => msg !== undefined) as string[];
  }
}



