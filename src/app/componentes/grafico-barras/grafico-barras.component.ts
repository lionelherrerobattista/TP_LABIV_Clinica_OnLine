import { Component, OnInit, Input } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {
  
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
  public barChartType = 'bar';
  public barChartLegend = true;
  barChartData;
  datosParaArchivo;


  constructor(private turnoService:TurnoService) {
   
  }

  
  ngOnInit(): void {
    this.listarTurnosPorDia();
  }


  listarTurnosPorDia(){

    this.turnoService.getTurnos().subscribe(listaTurnos => {

      let etiquetasDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let cantidadTurnos = [0, 0, 0, 0, 0, 0];
      let indice;

      //Buscar los días de los turnos y sumo 1 al array
      for(let turno of listaTurnos) {

        indice = turno.diaHora.toDate().getDay() - 1;

        cantidadTurnos[indice]++;
      }    

      this.barChartData = [{data: cantidadTurnos, label:'Turnos'}];
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
