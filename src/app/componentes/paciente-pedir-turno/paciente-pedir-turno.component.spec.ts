import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePedirTurnoComponent } from './paciente-pedir-turno.component';

describe('PacientePedirTurnoComponent', () => {
  let component: PacientePedirTurnoComponent;
  let fixture: ComponentFixture<PacientePedirTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientePedirTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientePedirTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
