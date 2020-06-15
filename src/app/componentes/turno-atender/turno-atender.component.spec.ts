import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAtenderComponent } from './turno-atender.component';

describe('TurnoAtenderComponent', () => {
  let component: TurnoAtenderComponent;
  let fixture: ComponentFixture<TurnoAtenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoAtenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoAtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
