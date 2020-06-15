import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-turno-cargar',
  templateUrl: './turno-cargar.component.html',
  styleUrls: ['./turno-cargar.component.css']
})
export class TurnoCargarComponent implements OnInit {

  pacienteParaDetalle:Paciente;

  constructor() { }

  ngOnInit(): void {
  }

  tomarPacienteParaDetalle(paciente){

    this.pacienteParaDetalle = paciente;

  }

}
