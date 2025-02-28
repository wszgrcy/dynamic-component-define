# run demo
- npm i
- npm start

# use
- npm i @cyia/dynamic-component-define
```ts
import { createDynamicComponentDefine } from '@cyia/dynamic-component-define';

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
```