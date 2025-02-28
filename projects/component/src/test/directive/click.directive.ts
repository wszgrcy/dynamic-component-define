import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[attachClick]',
})
export class ClickDirective {
  clientEvent = output();
  @HostListener('click', ['$event'])
  clicked(event: any) {
    this.clientEvent.emit(event);
  }
}
