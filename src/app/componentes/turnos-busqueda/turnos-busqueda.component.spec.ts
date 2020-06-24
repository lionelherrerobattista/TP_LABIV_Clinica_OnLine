import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosBusquedaComponent } from './turnos-busqueda.component';

describe('TurnosBusquedaComponent', () => {
  let component: TurnosBusquedaComponent;
  let fixture: ComponentFixture<TurnosBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
