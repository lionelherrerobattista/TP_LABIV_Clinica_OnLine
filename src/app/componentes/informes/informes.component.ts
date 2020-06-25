import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/clases/profesional';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  dataSource;
  listaIngresos;
  displayedColumns;
  datosParaGraficos;
  etiquetasParaGraficos;
  mostrarGraficoBarras:boolean;
  
  

  constructor(
    private usarioService:UsuarioService, 
    private turnoService:TurnoService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.listaIngresos = [];
    this.displayedColumns = ['Profesional', 'Ingreso'];
    this.datosParaGraficos = [];
    this.etiquetasParaGraficos = [];
    this.mostrarGraficoBarras = false;
  
  }

  ngOnInit(): void {
    // this.dataSource.data = this.listaIngresos;
    this.mostrarIngresos();
  }

  ///Muestra los ingresos de todos los usuarios con prefil "profesional"
  mostrarIngresos(){
    let ingreso;

    this.usarioService.getUsuarios().subscribe(listaUsuarios =>{
      let listaProfesionales = listaUsuarios.filter(usuario => usuario.perfil == "profesional");
      
      //Cargar los ingresos
      for(let profesional of listaProfesionales){
        for(let dia of profesional.ingresos) {
          ingreso = {
            usuario: profesional.apellido + ", " + profesional.nombre,
            dia: dia,
          }

          this.listaIngresos.push(ingreso);
        }
      }

      this.dataSource.data = this.listaIngresos;
      this.crearDatosParaGrafico(<Profesional[]>listaProfesionales);

      //Guardar lista en archivo
      //Ordenar lista por segundos UNIX
      console.log(this.listaIngresos);
    })

  }


  crearDatosParaGrafico(listaProfesionales:Profesional[]){
    let etiquetas = [];
    let datos = [];
    let indice;

    for(let profesional of listaProfesionales) {

      //Cargar datos y etiquetas
      for(let especialidad of profesional.especialidades) {
        //Buscar si la etiqueta está guardada
        indice = etiquetas.indexOf(especialidad);

        if(indice > -1) {
          //Sumar a los datos existentes
          datos[indice] += profesional.cantidadOperaciones;
        } else {
          //Agregar nuevos datos
          etiquetas.push(especialidad);
          datos.push(profesional.cantidadOperaciones);
        }
      } 
    }

    //Asignar datos para input
    this.datosParaGraficos = datos;
    this.etiquetasParaGraficos = etiquetas;
    this.mostrarGraficoBarras = true;
  }

  

}
