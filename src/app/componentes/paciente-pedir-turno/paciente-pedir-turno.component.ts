import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import {MatTableDataSource} from '@angular/material/table';
import { Profesional } from 'src/app/clases/profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-pedir-turno',
  templateUrl: './paciente-pedir-turno.component.html',
  styleUrls: ['./paciente-pedir-turno.component.css']
})
export class PacientePedirTurnoComponent implements OnInit {

  displayedColumns:string[] = ['Profesional', 'Especialidad', 'Día','Hora', 'Acciones'];
  profesionales:Profesional[];
  dataSource;
  profesionalSeleccionado:Profesional;

  
  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
  ) { }

  ngOnInit(): void {

    this.cargarLista();
    
  }

  cargarLista() {
    this.usuarioService.devolverListado().subscribe(listaProfesionales => {

      this.dataSource= new MatTableDataSource(listaProfesionales.filter( usuario => usuario.perfil == 'profesional'));

    })
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pedirTurno(profesional:Profesional) {
  
    this.profesionalSeleccionado = profesional;
  }



}
