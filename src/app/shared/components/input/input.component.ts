import { Component, Input, forwardRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [MatIcon],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'date' = 'text';
  @Input() placeholder = '';
  @Input() control: AbstractControl<any> | null = null;
  @Input() passwordMissmatchError = '';
  @Input() icon = '';

  showPassword = false;

  value: string = '';
  disabled = false;

  // Funciones internas para propagar cambios

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  handleBlur() {
    this.onTouched();
  }

  togglePasswordVisibility() {
    if (!['password', 'passwordConfirm'].includes(this.id)) {
      return;
    }

    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.type = 'text';
      this.icon = 'visibility_off';
    } else {
      this.type = 'password';
      this.icon = 'visibility';
    }
  }
}
