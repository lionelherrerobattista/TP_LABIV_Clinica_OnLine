import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteListaTurnosComponent } from './paciente-lista-turnos.component';

describe('PacienteListaTurnosComponent', () => {
  let component: PacienteListaTurnosComponent;
  let fixture: ComponentFixture<PacienteListaTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteListaTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteListaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
