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
  }
  changeClass() {
    this.classInput.update((item) => {
      return { ...item, inputValue2: 'changedClass' };
    });
  }
}
