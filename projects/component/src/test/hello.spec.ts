import {
  Component,
  createComponent,
  EnvironmentInjector,
  inject,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createDynamicComponentDefine } from '../lib/dynamic-define.component';
import { C1Component } from './component/c1.component';
import { ClassDirective } from './directive/class.directive';
import { ClickDirective } from './directive/click.directive';

describe('hello', () => {
  let instance: TestEnv;
  let fixture: ComponentFixture<TestEnv>;
  let el: HTMLElement;
  @Component({
    template: `<ng-container #continerRef></ng-container> `,
    standalone: true,
    imports: [],
  })
  class TestEnv {
    envInjector = inject(EnvironmentInjector);
    continerRef = viewChild<ViewContainerRef, ViewContainerRef>('continerRef', {
      read: ViewContainerRef,
    });
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEnv],
    }).compileComponents();

    fixture = TestBed.createComponent(TestEnv);
    instance = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });
  it('base', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    let eventClicked = false;
    let classInput = signal({ inputValue2: 'hello' });
    let define = createDynamicComponentDefine({ type: C1Component }, [
      {
        type: ClassDirective,
        inputs: classInput,
      },
      {
        type: ClickDirective,
        outputs: {
          clientEvent: () => {
            eventClicked = true;
          },
        },
      },
    ]);
    let ref = createComponent(define, {
      environmentInjector: instance.envInjector,
    });
    instance.continerRef()!.createEmbeddedView(ref.instance.templateRef());
    await fixture.whenStable();
    fixture.detectChanges();
    let compEl = el.querySelector('app-c1');
    expect(compEl).toBeTruthy();
    expect(compEl?.classList.contains(classInput().inputValue2)).toBeTruthy();
    expect(eventClicked).toBeFalse();
    (compEl as HTMLElement).click();
    expect(eventClicked).toBeTrue();
  });
});
