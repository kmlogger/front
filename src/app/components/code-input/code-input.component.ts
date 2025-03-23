import {
  Component, QueryList, ViewChildren, OnDestroy, ElementRef, Input, forwardRef
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormArray, FormControl, ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="code-input-container">
      <input
        *ngFor="let control of codeControls.controls; let i = index"
        type="text"
        maxlength="1"
        class="code-input"
        [formControl]="control"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        #codeInput
      />
    </div>
  `,
   styles: [`
    .code-input-container {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    .code-input {
      width: 50px;
      height: 50px;
      font-size: 24px;
      text-align: center;
      border: 2px solid #7B00FF;
      color: var(--text-color);
      border-radius: 8px;
      background-color: transparent;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .code-input:focus {
      border-color: #5400d4;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent), // Usando forwardRef
      multi: true
    }
  ]
})
export class CodeInputComponent implements ControlValueAccessor, OnDestroy {
  static nextId = 0;
  id = `code-input-${CodeInputComponent.nextId++}`;
  stateChanges = new Subject<void>();

  private _value: string = '';
  @Input() placeholder: string = 'Digite o código';
  @Input() control!: FormControl; // Recebe o FormControl como input

  codeControls = new FormArray([
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
    new FormControl('')
  ]);

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  constructor() {} // Removida a injeção de NgControl

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string) {
    if (value !== undefined) {
      this._value = value;
      this.updateControls(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (!/^\d$/.test(input.value)) {
      input.value = '';
      return;
    }

    if (index < this.codeControls.length - 1) {
      this.codeInputs.get(index + 1)?.nativeElement.focus();
    }

    // Atualiza o valor do FormControl
    this.updateFormControlValue();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.codeControls.at(index)?.value && index > 0) {
      this.codeInputs.get(index - 1)?.nativeElement.focus();
    }

    // Atualiza o valor do FormControl
    this.updateFormControlValue();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  private updateControls(value: string) {
    const valueArray = value.split('');
    this.codeControls.controls.forEach((control, index) => {
      control.setValue(valueArray[index] || '', { emitEvent: false });
    });
  }

  private updateFormControlValue() {
    const value = this.codeControls.controls.map(control => control.value).join('');
    this.onChange(value); // Notifica o FormControl sobre a mudança
  }
}
