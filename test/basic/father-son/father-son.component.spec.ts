import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match the snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('should not show buttons if there is no client', () => { 
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  test('should show 2 buttons if there is a client', () => { 
    component.client = { id: 1, name: 'Jose'}
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  test('should match snapshot if there is a client', () => { 
    component.client = { id: 1, name: 'Jose'}
    fixture.detectChanges();

    expect(compiled).toMatchSnapshot();
  });

  test('should emit onDeleteClient with the button of Delete client', () => { 
    component.client = { id: 1, name: 'Jose'}
    fixture.detectChanges();

    jest.spyOn(component.onDeleteClient, 'emit');

    const btnDelete = compiled.querySelector('[data-test=btn-delete]');
    //console.log(btnDelete?.textContent);
    btnDelete?.dispatchEvent(new Event('click'));

    expect(component.onDeleteClient.emit).toHaveBeenCalled();

  });

  test('should emit onClientUpdated with the button of ChangeID', () => { 
    component.client = { id: 1, name: 'Jose'}
    fixture.detectChanges();

    jest.spyOn(component.onClientUpdated, 'emit');

    const btnChangeId = compiled.querySelector('[data-test=btn-id]');
    btnChangeId?.dispatchEvent(new Event('click'));

    expect(component.onClientUpdated.emit).toHaveBeenCalled();
    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      id:2,
      name: 'Jose'
    });
  });

  test('should emit onChangeClient with ID specified if there is a client', () => { 
    jest.spyOn(component.onClientUpdated, 'emit');
    component.onChange(10);
    
    expect(component.onClientUpdated.emit).not.toHaveBeenCalled();

    component.client = { id: 1, name: 'Jose'}
    fixture.detectChanges();
    component.onChange(10);

    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      id: 10,
      name: 'Jose'
    });
    
    
  });

});
