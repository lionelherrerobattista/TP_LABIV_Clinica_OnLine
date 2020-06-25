import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarrasHorizontalesComponent } from './grafico-barras-horizontales.component';

describe('GraficoBarrasHorizontalesComponent', () => {
  let component: GraficoBarrasHorizontalesComponent;
  let fixture: ComponentFixture<GraficoBarrasHorizontalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoBarrasHorizontalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoBarrasHorizontalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
