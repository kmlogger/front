import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { InputComponent } from '../input/input.component';
import { CodeInputComponent } from '../code-input/code-input.component';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    InputComponent,
    CodeInputComponent,
    CardModule,
    ButtonModule
  ],
  template: `
    <p-card class="form-card">
      <ng-template pTemplate="header">
        <ng-content select="[form-title]"></ng-content>
      </ng-template>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ng-container *ngFor="let field of fields">
          <app-input
            *ngIf="field.type !== 'code'"
            [control]="getFormControl(field.name)"
            [label]="field.label"
            [type]="field.type || 'text'"
            [mask]="field.mask"
            [errorMessages]="field.errorMessages"
          ></app-input>

          <app-code-input
            *ngIf="field.type === 'code'"
            [formControlName]="field.name"
          ></app-code-input>
        </ng-container>

        <div class="button-container">
          <button pButton type="submit" label="{{ submitButtonLabel }}" [disabled]="form.invalid"></button>
          <button
            *ngFor="let extraButton of extraButtons"
            pButton
            type="button"
            (click)="extraButton.action.emit()"
            label="{{ extraButton.label }}">
          </button>
        </div>
      </form>
    </p-card>
  `,
  styles: [`
    .form-card {
      background: transparent;
      padding: 40px;
      text-align: center;
      margin: 0 auto;
    }
    

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }

    ::ng-deep .p-card {
      width: 55vh; 
      max-width: 90vw;
    }

    button {
      width: 100%;
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

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
