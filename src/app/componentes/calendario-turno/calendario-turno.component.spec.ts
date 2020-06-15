import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioTurnoComponent } from './calendario-turno.component';

describe('CalendarioTurnoComponent', () => {
  let component: CalendarioTurnoComponent;
  let fixture: ComponentFixture<CalendarioTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
