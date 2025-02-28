# 动态组件定义(组件动态连接桥)

## 这个库做什么的?

- 它可以在动态创建组件时(`createComponent`),额外添加指令
- 它允许手动指定投影选择器投影到指定位置
- 它可以动态创建 html 元素并挂载指令

## 它是如何实现的?

- 使用未公开的公开 API,手动模拟 ng 组件编译,实现一个最小的组件

# run demo

- npm i
- npm start

# use

- npm i @cyia/dynamic-component-define

```ts
import { createDynamicComponentDefine } from "@cyia/dynamic-component-define";

export class AppComponent {
  envInjector = inject(EnvironmentInjector);
  continerRef = viewChild<ViewContainerRef, ViewContainerRef>("continerRef", {
    read: ViewContainerRef,
  });
  classInput = signal({ inputValue2: "hello" });
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
            console.log("click", event);
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
      return { ...item, inputValue2: "changedClass" };
    });
  }
}
```
