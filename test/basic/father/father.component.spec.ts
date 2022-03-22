import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherComponent } from '../../../src/app/basic/father/father.component';
import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';
import { By } from '@angular/platform-browser';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherComponent, FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match the snapshot', () => { 
    
    expect(compiled).toMatchSnapshot();

  });

  test('should set the client with the name specified', () => { 
    component.onSetClient('Pedro');
    fixture.detectChanges();
    
    const codeDiv = compiled.querySelector('.mt-2');
    //console.log(codeDiv?.textContent)

    expect(codeDiv?.textContent).toContain('"name"');
    expect(codeDiv?.textContent).toContain('"Pedro"');
  });

  test('should delete the client if emit onDeleteClient (son)', () => { 
    
    component.client = { id: 1, name: 'Eduardo'};
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) );
    const sonComponent: FatherSonComponent = sonDebugElement.componentInstance;
    //console.log(sonComponent.client);

    sonComponent.onDeleteClient.emit();
    expect(component.client).toBe(undefined);

  });

  test('should update the client onClietUpdated', () => { 
    
    component.client = { id: 1, name: 'Eduardo'};
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) );
    const sonComponent: FatherSonComponent = sonDebugElement.componentInstance;

    sonComponent.onClientUpdated.emit({ id:10, name: 'John' });
    expect(component.client).toEqual({ id:10, name: 'John' });

  });

  
});
