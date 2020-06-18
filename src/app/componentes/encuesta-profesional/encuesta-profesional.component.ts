import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-profesional',
  templateUrl: './encuesta-profesional.component.html',
  styleUrls: ['./encuesta-profesional.component.css']
})
export class EncuestaProfesionalComponent implements OnInit {

  predisposicion;
  puntualidad;
  atenderOtraVez;
  
  constructor() { }

  ngOnInit(): void {
  }

  guardarEncuesta(){

  }

}
