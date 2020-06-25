import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.css']
})
export class GraficoTortaComponent implements OnInit {
  
  @Input()pieChartLabels;
  @Input()pieChartData;
  datosParaArchivo;

  public pieChartType = 'pie';

  constructor() { }

  ngOnInit(): void {
    this.parsearDatosParaArchivo();
  }

  parsearDatosParaArchivo(){

    let datosParseados = [];
    let dato;

    for(let i = 0; i < this.pieChartLabels.length; i++) {
      dato = {
        especialidad: this.pieChartLabels[i],
        cantidadIngresos: this.pieChartData[i],
      }

      datosParseados.push(dato);
    } 

    console.log(datosParseados);
    this.datosParaArchivo = datosParseados;

  }

}
