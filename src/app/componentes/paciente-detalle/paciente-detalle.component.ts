import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Router } from '@angular/router';

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

  iniciarEncuesta() {
    
    this.router.navigate(['/encuesta/paciente']);
  }

}
