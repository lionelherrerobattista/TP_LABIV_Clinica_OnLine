import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoCargarComponent } from './turno-cargar.component';

describe('TurnoCargarComponent', () => {
  let component: TurnoCargarComponent;
  let fixture: ComponentFixture<TurnoCargarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoCargarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
