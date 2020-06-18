import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaCargarComponent } from './historia-clinica-cargar.component';

describe('HistoriaClinicaCargarComponent', () => {
  let component: HistoriaClinicaCargarComponent;
  let fixture: ComponentFixture<HistoriaClinicaCargarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaCargarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
