import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtencionProfesionalComponent } from './form-atencion-profesional.component';

describe('FormAtencionProfesionalComponent', () => {
  let component: FormAtencionProfesionalComponent;
  let fixture: ComponentFixture<FormAtencionProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAtencionProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAtencionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
