import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  listadoPacientes;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.devolverListado().subscribe(lista => {
      this.listadoPacientes = lista;
    })

    this.usuarioService.filtrarListaPorPerfil('paciente');
  }

}
