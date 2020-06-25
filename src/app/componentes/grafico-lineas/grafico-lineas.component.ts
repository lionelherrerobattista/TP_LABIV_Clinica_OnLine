import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-grafico-lineas',
  templateUrl: './grafico-lineas.component.html',
  styleUrls: ['./grafico-lineas.component.css']
})

export class GraficoLineasComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel:  {
          display: true,
          labelString: 'Turnos'
        },
        ticks: {
          suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          // OR //
          beginAtZero: true   // minimum value will be 0.
        } 
      }],
      xAxes: [{
        scaleLabel:  {
          display: true,
          labelString: 'Días'
        }
      }],
    }
  };
  barChartLabels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public barChartType = 'line';
  public barChartLegend = true;
  barChartData;
  datosParaArchivo;


  constructor(private usuarioService:UsuarioService) {
   
  }

  
  ngOnInit(): void {
    this.listarTurnosPorDia();
    
  }


  listarTurnosPorDia(){

    this.usuarioService.getUsuarios().subscribe(listaUsuarios =>{

      let listaProfesionales = <Profesional[]>listaUsuarios.filter(usuario => usuario.perfil == "profesional");     
      let etiquetasDias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
      let cantidadMedicos = [0, 0, 0, 0, 0, 0];
      let indice;

      //Buscar los días de los turnos y sumo 1 al array
      for(let profesional of listaProfesionales) {
        for(let dia of profesional.diasAtencion) {      
          indice = etiquetasDias.indexOf(dia.dia);

          cantidadMedicos[indice]++;
        }       
      }    

      this.barChartData = [{data: cantidadMedicos, label:'Médicos'}];
      this.barChartLabels = etiquetasDias;
      this.parsearDatosParaArchivo();
    })
  }


  parsearDatosParaArchivo(){

    let datosParseados = [];
    let dato;

    for(let i = 0; i < this.barChartLabels.length; i++) {
      dato = {
        dia: this.barChartLabels[i],
        cantidadMedicos: this.barChartData[0].data[i],
      }

      datosParseados.push(dato);
    } 

    console.log(datosParseados);
    this.datosParaArchivo = datosParseados;

  }
}
