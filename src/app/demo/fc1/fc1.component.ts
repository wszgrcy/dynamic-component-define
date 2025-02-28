import { Component, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-fc1',
  imports: [FormsModule],
  templateUrl: './fc1.component.html',
  styleUrl: './fc1.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Fc1Component),
      multi: true,
    },
  ],
})
export class Fc1Component implements ControlValueAccessor {
  value$ = signal('');
  fn: any;
  writeValue(obj: any): void {
    this.value$.set(obj ?? '');
  }
  registerOnChange(fn: any): void {
    this.fn = fn;
  }
  registerOnTouched(fn: any): void {}

  valueChange(event: any) {
    this.fn(event);
  }
}
