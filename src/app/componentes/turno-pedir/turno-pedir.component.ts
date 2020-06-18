import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import {MatTableDataSource} from '@angular/material/table';
import { Profesional } from 'src/app/clases/profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-turno-pedir',
  templateUrl: './turno-pedir.component.html',
  styleUrls: ['./turno-pedir.component.css']
})
export class TurnoPedirComponent implements OnInit {

  displayedColumns:string[] = ['Profesional', 'Especialidad', 'Día','Hora', 'Acciones'];
  profesionales:Profesional[];
  pacienteActual:Paciente;
  dataSource;
  profesionalSeleccionado:Profesional;

  
  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {

    this.cargarLista();
    this.buscarPaciente();
    
  }

  async buscarPaciente() {
    let usuarioLogeado = await this.authService.getUsuarioLogeado();

    if(usuarioLogeado != null) {

      this.usuarioService.getUsuario(usuarioLogeado.uid).subscribe(usuarioActual => {

        //Castear a paciente
        this.pacienteActual = <Paciente>usuarioActual;

      });
    }  
  }

  cargarLista() {
    this.usuarioService.devolverListado().subscribe(listaProfesionales => {

      console.log(listaProfesionales)

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
