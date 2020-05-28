import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  listadoPacientes;

  constructor(private pacienteService:PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.devolverListado().subscribe(listado => {
      this.listadoPacientes = listado;
    });

    this.pacienteService.actualizarListado();
  }

}
