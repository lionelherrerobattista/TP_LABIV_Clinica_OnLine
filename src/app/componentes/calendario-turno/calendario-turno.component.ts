import { Component, OnInit, Input } from '@angular/core';
import { Profesional, HorarioAtencion } from 'src/app/clases/profesional';

@Component({
  selector: 'app-calendario-turno',
  templateUrl: './calendario-turno.component.html',
  styleUrls: ['./calendario-turno.component.css']
})
export class CalendarioTurnoComponent implements OnInit {

  limiteMax:Date;
  limiteMin:Date;
  dia:string;
  horario:string;
  mostrar=false;
  @Input()profesional:Profesional;

  constructor() {
    this.limiteMin = new Date();
    this.limiteMax = new Date();
  }

  ngOnInit(): void {
   this.limiteMax.setDate(this.limiteMin.getDate() + 15);
  }

  pedirTurno() {

  }

  comprobarFecha(d: Date | null):boolean {
    
    const dia = (d || new Date()).getDay();
    let esValido = false;
    let numeroDia;

    //bindear el this si se usa como funcion filtro en calendario
    for(let atencion of this.profesional.diasAtencion) {
      numeroDia= this.convertirDiaNumero(atencion.dia);
      
      if(dia == numeroDia) {
        esValido = true;
        
        break;
      }
    }
    return esValido;
  }

  comprobarDiaHora() {
    ///Revisar si el día está ocupado, ocultar opción si está ocupado
  }

  ///Convierte el dia en string a número para utilizarcon Date.getDay()
  convertirDiaNumero(dia:string){

    var arrayDias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    var numeroDeDia;

    for(let auxDia of arrayDias) {
      
      if(dia.toLowerCase() == auxDia) {
        numeroDeDia = arrayDias.indexOf(auxDia);
        break;
      }
    }

    return numeroDeDia;

  }
}
