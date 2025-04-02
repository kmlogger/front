import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from '../input/input.component';
import { CodeInputComponent } from '../code-input/code-input.component';
import { WidgetCardComponent } from '../custom-widgets/widget-card.component' 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
    ButtonModule,
    WidgetCardComponent
  ],
  template: `
    <app-widget-card>
      <div widget-header>
        <h2 style="justify-content: center; align-items: center">{{ title }}</h2>
      </div>

      <div widget-content>
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
            <button pButton type="submit" [disabled]="form.invalid" label="{{ submitButtonLabel }}"></button>
            <button
              *ngFor="let extraButton of extraButtons"
              pButton
              type="button"
              (click)="extraButton.action.emit()"
              label="{{ extraButton.label }}">
            </button>
          </div>
        </form>
      </div>

      <!-- footer vazio, se necessário -->
      <div widget-footer></div>
    </app-widget-card>

  `,
  styles: [`
    .button-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    app-input,
    app-code-input,
    .button-container {
      width: 100%;
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
  @Input() title: string = '';
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
