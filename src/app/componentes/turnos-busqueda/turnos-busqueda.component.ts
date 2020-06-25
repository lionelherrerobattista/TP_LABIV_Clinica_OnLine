import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Profesional } from 'src/app/clases/profesional';
import { Paciente } from 'src/app/clases/paciente';

interface ListaFiltros {
  nombreFiltro:string;
  nombreParaMostrar:string;
}

@Component({
  selector: 'app-turnos-busqueda',
  templateUrl: './turnos-busqueda.component.html',
  styleUrls: ['./turnos-busqueda.component.css']
})
export class TurnosBusquedaComponent implements OnInit {

  
  listaFiltros:ListaFiltros[]
  displayedColumns;
  filtro:string;
  tipoFiltro:string;
  listaTurnos:Turno[];
  diaSeleccionado:Date;
  profesionalSeleccionado:Profesional;
  pacienteSeleccionado:Paciente;

  constructor(
    private turnoService:TurnoService,
  ) {

    this.filtro = "";
    this.displayedColumns = ['Día', 'Hora', 'Paciente', 'Profesional', 'Especialidad', 'Estado'];
    this.listaFiltros = [
      {
        nombreFiltro: 'todos',
        nombreParaMostrar: 'Todos',
      },
      {
        nombreFiltro: 'nombrePaciente',
        nombreParaMostrar: 'Nombre Paciente',
      },
      {
        nombreFiltro: 'nombreProfesional',
        nombreParaMostrar: 'Nombre Profesional',
      },
      {
        nombreFiltro: 'temperaturaCorporal',
        nombreParaMostrar: 'Temperatura Corporal',
      },
      {
        nombreFiltro: 'edad',
        nombreParaMostrar: 'Edad',
      },
      {
        nombreFiltro: 'presion',
        nombreParaMostrar: 'Presión',
      },
      {
        nombreFiltro: 'datosExtra',
        nombreParaMostrar: 'Datos Adicionales',
      },
      {
        nombreFiltro: 'especialidad',
        nombreParaMostrar: 'Especialidad',
      },
      
    ];
    this.turnoService.getTurnos().subscribe(turnos => {
      console.log(turnos)
      turnos.sort( this.ordernar);
      this.listaTurnos = turnos;
    });
  }

  ngOnInit(): void {
  }

  aplicarFiltro(){
   
    if(this.tipoFiltro == "todos" && this.filtro == "") {
      this.turnoService.getTurnos().subscribe(lista => {
        console.log(lista);
        lista.sort( this.ordernar);
        this.listaTurnos = lista;
      });
     
    } else {
      this.turnoService.getTurnosFiltrados(this.filtro, this.tipoFiltro).subscribe( lista => {
        console.log(lista);
        lista.sort( this.ordernar);

        this.listaTurnos = lista;
        
      });
     
    }
  }

  ordernar(a:Turno,b:Turno) {
    console.log(a)
    return a.diaHora.seconds - b.diaHora.seconds
  }

  filtrarDia() {

    this.turnoService.getTurnosFiltrados(this.diaSeleccionado, 'dia').subscribe( lista => {
      
      this.listaTurnos = lista;
    });

  }


  mostrarDetalles(paciente:Paciente, profesional:Profesional) {
    this.pacienteSeleccionado = paciente;
    this.profesionalSeleccionado = profesional;
  }
}
