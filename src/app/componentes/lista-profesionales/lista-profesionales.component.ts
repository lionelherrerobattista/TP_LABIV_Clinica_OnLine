import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-lista-profesionales',
  templateUrl: './lista-profesionales.component.html',
  styleUrls: ['./lista-profesionales.component.css']
})
export class ListaProfesionalesComponent implements OnInit {

  listadoProfesionales

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.devolverListado().subscribe(lista => {
      this.listadoProfesionales = lista;
    })

    this.usuarioService.filtrarListaPorPerfil('profesional');
  }


}
