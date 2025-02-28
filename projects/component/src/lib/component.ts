import { Injector, Signal, SimpleChange, Type, WritableSignal } from '@angular/core';

export type TypeChanges<K extends Record<string, any>> = {
  [P in keyof K]: SimpleChange;
};

export interface DirectiveOutputs {
  [name: string]: (event: any) => void;
}

export interface DynamicComponentConfig {
  type: Type<any> | string;
  attributes?: Record<string, any>;
  selector?: string;
  module?: Type<any>;
  inputs?: Signal<Record<string, any>>;
  directives?: DirectiveConfig[];
  outputs?: DirectiveOutputs;
  injector?: Injector;
  contents?: ComponentContent;
}

export interface RawComponentDefine {
  type: Type<any> | string | (() => Promise<Type<any>>);
  attributes?: Record<string, any>;
  selector?: string;
  module?: Type<any>;
}
export type RawWrapperDefine = RawComponentDefine & {
  inputs?: Record<string, any>;
};
export interface ComponentDefine {
  type: Type<any> | string;
  attributes?: Record<string, any>;
  selector?: string;
  module?: Type<any>;
}
export type WrapperDefine = ComponentDefine & {
  inputs?: Signal<Record<string, any>>;
};

export type ComponentContent = {
  select?: string;
  nodes?: any[];
  text?: Signal<string>;
}[];
export type DirectiveConfig<T = any> = {
  /** string表示是标签,type<any>是组件或者指令 */
  type: Type<T> | string;
  inputs?: Signal<Record<string, any>>;
  outputs?: DirectiveOutputs;
  model?: Record<string, WritableSignal<any>>;
  selector?: string;
  attributes?: Record<string, any>;
  contents?: ComponentContent;
};
