import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoProfesionalComponent } from './turno-profesional.component';

describe('TurnoProfesionalComponent', () => {
  let component: TurnoProfesionalComponent;
  let fixture: ComponentFixture<TurnoProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
