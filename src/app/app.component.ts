import {
  Component,
  createComponent,
  EnvironmentInjector,
  inject,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createDynamicComponentDefine } from '@cyia/dynamic-component-define';
import { C1Component } from '../../projects/component/src/test/component/c1.component';
import { ClassDirective } from '../../projects/component/src/test/directive/class.directive';
import { ClickDirective } from '../../projects/component/src/test/directive/click.directive';
import { Fc1Component } from './demo/fc1/fc1.component';
import { FormControl, FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  envInjector = inject(EnvironmentInjector);
  continerRef = viewChild<ViewContainerRef, ViewContainerRef>('continerRef', {
    read: ViewContainerRef,
  });
  classInput = signal({ inputValue2: 'hello' });
  ngOnInit(): void {
    let define = createDynamicComponentDefine({ type: C1Component }, [
      {
        type: ClassDirective,
        inputs: this.classInput,
      },
      {
        type: ClickDirective,
        outputs: {
          clientEvent: (event: any) => {
            console.log('click', event);
          },
        },
      },
    ]);
    let ref = createComponent(define, {
      environmentInjector: this.envInjector,
    });
    this.continerRef()!.createEmbeddedView(ref.instance.templateRef());
    let fc = new FormControl();
    let formInput = signal({
      formControl: fc,
    });
    fc.valueChanges.subscribe((value) => {
      console.log('值变更', value);
    });
    let define2 = createDynamicComponentDefine({ type: Fc1Component }, [
      {
        type: FormControlDirective,
        inputs: formInput,
      },
    ]);
    let ref2 = createComponent(define2, {
      environmentInjector: this.envInjector,
    });
    this.continerRef()!.createEmbeddedView(ref2.instance.templateRef());
  }
  changeClass() {
    this.classInput.update((item) => {
      return { ...item, inputValue2: 'changedClass' };
    });
  }
}
