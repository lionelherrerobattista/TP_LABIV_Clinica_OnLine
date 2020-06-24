import { Component, OnInit, Input } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-profesional-detalle',
  templateUrl: './profesional-detalle.component.html',
  styleUrls: ['./profesional-detalle.component.css']
})
export class ProfesionalDetalleComponent implements OnInit {

  @Input()profesional:Profesional;
  
  constructor() { }

  ngOnInit(): void {
  }

}
