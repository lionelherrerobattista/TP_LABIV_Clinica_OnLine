import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface HorarioAtencion {
  dia:string,
  horario:string,
}

@Component({
  selector: 'app-form-atencion-profesional',
  templateUrl: './form-atencion-profesional.component.html',
  styleUrls: ['./form-atencion-profesional.component.css']
})
export class FormAtencionProfesionalComponent implements OnInit {

  dia:string;
  horario:string;
  displayedColumns: string[] = ['Día', 'Horario', 'Eliminar'];
  diasDeAtencion:HorarioAtencion[];
  dataSource;//fuente de datos que la lista usa

  constructor() {

    this.dataSource = new MatTableDataSource<HorarioAtencion>();
    this.diasDeAtencion = [];
    this.dataSource.data = this.diasDeAtencion;
   }

  ngOnInit(): void {
  }

  agregarDiaHorario() {
    let horarioAtencion:HorarioAtencion;

    console.log(this.dia);

    if(this.dia != undefined && this.horario != undefined) {

      horarioAtencion ={
        dia:this.dia,
        horario: this.horario,
      } 
      
      this.diasDeAtencion.push(horarioAtencion);

      //orderar array

      this.dataSource.data = this.diasDeAtencion; //para que se actualice la lista

      console.log(this.diasDeAtencion)
    }
  }

}
