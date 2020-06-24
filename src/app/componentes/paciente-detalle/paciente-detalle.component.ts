import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Router } from '@angular/router';
import { Profesional } from 'src/app/clases/profesional';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paciente-detalle',
  templateUrl: './paciente-detalle.component.html',
  styleUrls: ['./paciente-detalle.component.css']
})
export class PacienteDetalleComponent implements OnInit {

  @Input() paciente:Paciente;
 

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {

  }


}
