import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoPedirComponent } from './turno-pedir.component';

describe('TurnoPedirComponent', () => {
  let component: TurnoPedirComponent;
  let fixture: ComponentFixture<TurnoPedirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoPedirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoPedirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
