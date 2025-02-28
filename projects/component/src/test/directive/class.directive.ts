import { Directive, input } from '@angular/core';

@Directive({
  selector: '[attachClass]',
  host: {
    '[class]': 'inputValue()',
  },
})
export class ClassDirective {
  inputValue = input(undefined, { alias: 'inputValue2' });
}
