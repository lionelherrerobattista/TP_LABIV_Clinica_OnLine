import { Component, OnInit, Input } from '@angular/core';
import { map, filter, first } from 'rxjs/operators';
import { Profesional, HorarioAtencion } from 'src/app/clases/profesional';
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Turno } from 'src/app/clases/turno';
import { Paciente } from 'src/app/clases/paciente';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-calendario-turno',
  templateUrl: './calendario-turno.component.html',
  styleUrls: ['./calendario-turno.component.css']
})
export class CalendarioTurnoComponent implements OnInit {

  limiteMax:Date;
  limiteMin:Date;
  dia:Date;
  hora:string;
  horasAtencion:string[];
  mostrar=false;
  @Input()profesional:Profesional;

  constructor(
    private turnoService:TurnoService,
    private usuarioService:UsuarioService,

  ) {
    this.limiteMin = new Date();
    this.limiteMax = new Date();
  }

  ngOnInit(): void {
   this.limiteMax.setDate(this.limiteMin.getDate() + 15);
  }

  ///Guarda el turno en las distintas colecciones
  async pedirTurno() {
    let turno:Turno;
    let turnos:Turno[];
    let referenciaTurno:DocumentReference;
    let usuario = await this.usuarioService.getUsuarioActual();
    console.log(usuario);
    let paciente = <Paciente> usuario;
    //Formatear la hora
    let horaEntera = this.hora.split(':');
    let hora = +horaEntera[0];
    let minutos = +horaEntera[1];
    
    this.dia.setHours(this.dia.getHours() + hora);
    this.dia.setMinutes(this.dia.getMinutes() + minutos);

    turno = new Turno(this.dia, this.profesional, paciente);

    console.log(turno);

    //Guardar los turnos en las colecciones
    referenciaTurno = await this.turnoService.createTurno(turno);
    turnos = await this.turnoService.getTurno(referenciaTurno.id).pipe(first()).toPromise();

    this.profesional.turnos.push(turnos[0]);
    paciente.turnos.push(turnos[0]);

    this.usuarioService.updateUsuario(this.profesional);
    this.usuarioService.updateUsuario(paciente);
    
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


  mostrarHorarioTurnos() {

    let numeroDia;
    let diaSeleccionado = this.dia.getDay()

    for(let atencion of this.profesional.diasAtencion) {
      numeroDia= this.convertirDiaNumero(atencion.dia);
      
      if(diaSeleccionado == numeroDia) {   
        this.generarHorarios(atencion.horario);
        break;
      }
    }
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

  generarHorarios(horario) {
    
    let horaInicio:number;
    let horaFin:number;
    this.horasAtencion = []

    switch(horario) {
      case "8 a 14":
        horaInicio = 8;
        horaFin = 14;
      break;
      case "14 a 20":
        horaInicio = 14;
        horaFin = 20;
      break;
    }

    //Agregar los horarios
    for(let i = horaInicio; i < horaFin; i++){
      
      //8
      this.horasAtencion.push(i.toString() + ":00"); 
      //8:30, etc...
      this.horasAtencion.push(i.toString() + ":30");
    }
  }
}
