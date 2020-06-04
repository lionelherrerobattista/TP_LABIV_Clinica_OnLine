import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-lista-admins',
  templateUrl: './lista-admins.component.html',
  styleUrls: ['./lista-admins.component.css']
})
export class ListaAdminsComponent implements OnInit {

  listaAdmins;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.devolverListado().subscribe(lista => {
      this.listaAdmins = lista;
    })

    this.usuarioService.filtrarListaPorPerfil('administrador');
  }

}
