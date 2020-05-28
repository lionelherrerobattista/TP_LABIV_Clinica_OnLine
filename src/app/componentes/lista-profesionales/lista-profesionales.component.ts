import { Component, OnInit } from '@angular/core';
import { ProfesionalService } from 'src/app/servicios/profesional.service';

@Component({
  selector: 'app-lista-profesionales',
  templateUrl: './lista-profesionales.component.html',
  styleUrls: ['./lista-profesionales.component.css']
})
export class ListaProfesionalesComponent implements OnInit {

  listadoProfesionales

  constructor(private profesionalService:ProfesionalService) { }

  ngOnInit(): void {
    this.profesionalService.devolverListado().subscribe( listado =>{
      this.listadoProfesionales = listado;
    });

    this.profesionalService.actualizarListado();
  }


}
