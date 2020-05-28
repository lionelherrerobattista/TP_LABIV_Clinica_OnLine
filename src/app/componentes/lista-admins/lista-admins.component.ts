import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administrador.service';

@Component({
  selector: 'app-lista-admins',
  templateUrl: './lista-admins.component.html',
  styleUrls: ['./lista-admins.component.css']
})
export class ListaAdminsComponent implements OnInit {

  listaAdmins;
  constructor(private administradoresService:AdministradorService) { }

  ngOnInit(): void {
    this.administradoresService.devolverListado().subscribe(listado => {
      this.listaAdmins = listado;
    });

    this.administradoresService.actualizarListado();
  }

}
