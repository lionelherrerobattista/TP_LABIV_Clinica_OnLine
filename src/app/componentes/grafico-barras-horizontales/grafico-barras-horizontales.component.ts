import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-grafico-barras-horizontales',
  templateUrl: './grafico-barras-horizontales.component.html',
  styleUrls: ['./grafico-barras-horizontales.component.css']
})
export class GraficoBarrasHorizontalesComponent implements OnInit {

 
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
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
      yAxes: [{
        scaleLabel:  {
          display: true,
          labelString: 'Profesionales'
        }
      }],
    }
  };
  barChartLabels;
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  barChartData;
  datosParaArchivo;


  constructor(private usuarioService:UsuarioService) {
   this.barChartData = [{data: [] }];
   this.barChartLabels = [];
  }

  
  ngOnInit(): void {
    this.listarTurnosPorDia();
  }


  listarTurnosPorDia(){

    this.usuarioService.getUsuarios().subscribe(listaUsuarios =>{

      let listaProfesionales = <Profesional[]>listaUsuarios.filter(usuario => usuario.perfil == "profesional");     
      let cantidadProfesionales = listaProfesionales.length;
      let indice = 0;
      let cantidadTurnos = [];
      let nombres = [];
      let nombreCompleto;
      let set;
      let chartData = [];
      
      for(let profesional of listaProfesionales) {
        nombreCompleto = profesional.apellido + ", " + profesional.nombre;
        cantidadTurnos.push(profesional.turnos.length);
        nombres.push(nombreCompleto);

      }
    
      this.barChartData = [{data: cantidadTurnos, label:'Turnos'}];
      this.barChartLabels = nombres;  
      
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
