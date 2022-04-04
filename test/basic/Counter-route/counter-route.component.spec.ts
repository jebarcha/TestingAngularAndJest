import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CounterRouteComponent } from '../../../src/app/basic/counter-route/counter-route.component';
import { ActivatedRoute } from '@angular/router';

describe('CounterRouteComponent', () => {
  let component: CounterRouteComponent;
  let fixture: ComponentFixture<CounterRouteComponent>;

  test('should have initial value in zero', async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter).toBe(0);
  });

  test('should have initial value of 100 in the route /counter/100', async () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get(param: string) {
            console.log(param)
            return (param === 'initial') ? '100' : undefined
          }
        }
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      providers: [{
        provide: ActivatedRoute, useValue: mockActivatedRoute
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter).toBe(100);
  });

  
  test('should have initial value of 10 in the route /counter/20abc', async () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get(param: string) {
            return (param === 'initial') ? '20abc' : undefined
          }
        }
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      providers: [{
        provide: ActivatedRoute, useValue: mockActivatedRoute
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter).toBe(10);
  });

});
