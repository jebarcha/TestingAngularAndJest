import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from '../../../src/app/basic/counter/counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should component to match snapshot', () => { 
    expect( compiled ).toMatchSnapshot();
  });

  test('should counter increment based on the argument', () => { 
    
    component.increaseBy(5);
    expect(component.counter).toBe(15);
  });

  test('should increment and decrement by 1 when clicking the buttons', () => { 
    
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click();
    buttons[0].click();
    expect(component.counter).toBe(12);

    buttons[1].click();
    expect(component.counter).toBe(11);

  });

  test('should update the label when the counter change', () => { 
    
    component.increaseBy(10);
    fixture.detectChanges();

    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('20');

  });

});
