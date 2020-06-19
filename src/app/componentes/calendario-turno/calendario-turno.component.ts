import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Profesional, HorarioAtencion } from 'src/app/clases/profesional';
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Turno, estadoTurno } from 'src/app/clases/turno';
import { Paciente } from 'src/app/clases/paciente';
import { DocumentReference } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-calendario-turno',
  templateUrl: './calendario-turno.component.html',
  styleUrls: ['./calendario-turno.component.css']
})
export class CalendarioTurnoComponent implements OnInit {

  limiteMax:Date;
  limiteMin:Date;
  diaSeleccionado:Date;
  turnoSeleccionado:Date;
  horasAtencion:Date[];
  mostrar:boolean;
  @Input()profesional:Profesional;

  constructor(
    private turnoService:TurnoService,
    private usuarioService:UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.mostrar = false;
    this.limiteMin = new Date();
    this.limiteMax = new Date();
  }

  ngOnInit(): void {
   this.limiteMax.setDate(this.limiteMin.getDate() + 15);
  }

  ///Guarda el turno seleccionado por el paciente en las distintas colecciones
  async pedirTurno() {
    let turnoSeleccionado:Turno;
    let turno:Turno;
    let referenciaTurno:DocumentReference;
    let usuario = await this.usuarioService.getUsuarioActual();
    let profesional = <Profesional>await this.usuarioService.getUsuario(this.profesional.uid).pipe(first()).toPromise();
    let paciente = <Paciente> usuario;

    turnoSeleccionado = new Turno(this.turnoSeleccionado, profesional, paciente);

    //Guardar los turnos en la colección de turnos
    referenciaTurno = await this.turnoService.createTurno(turnoSeleccionado);
    
    //Replicar los datos en las demás colecciones
    turno = await this.turnoService.getTurno(referenciaTurno.id).pipe(first()).toPromise();

    //Volver a tomar los datos con el array de turnos
    profesional = <Profesional>await this.usuarioService.getUsuario(this.profesional.uid).pipe(first()).toPromise();
    paciente = <Paciente> await this.usuarioService.getUsuarioActual();
    console.log(this.profesional);
    console.log(profesional);

    profesional.turnos.push(turno);
    // profesional.turnos.push(turno);
    paciente.turnos.push(turno);

    this.usuarioService.updateUsuario(profesional);
    this.usuarioService.updateUsuario(paciente);

    this.openSnackBar('¡Turno Guardado!');
    
  }

  ///Filtra las fechas para mostrar solo aquellas que están disponibles
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


  //Muestra el selector de los horarios disponibles para sacar turno
  //en el día seleccionado
  mostrarHorarioTurnos() {

    let numeroDia;
    let diaSeleccionado = this.diaSeleccionado.getDay()

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

  ///Genera los horarios del día seleccionado disponibles 
  async generarHorarios(horario) {
    
    let horaInicio:number;
    let horaFin:number;
    let listaTurnos = await this.turnoService.getTurnos().pipe(first()).toPromise();
    this.horasAtencion = [];

    //Horarios de atención de los médicos
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

    //Agregar los horarios, creo variables date
    let horaDisponible;
    for(let i = horaInicio; i < horaFin; i++){
      
      //8
      horaDisponible = new Date(this.diaSeleccionado); //las 0 del día seleccionado  
      horaDisponible.setHours(horaDisponible.getHours() + i);
      this.horasAtencion.push(horaDisponible); 
      //8:30, etc...
      horaDisponible = new Date(this.diaSeleccionado);
      horaDisponible.setHours(horaDisponible.getHours() + i);
      horaDisponible.setMinutes(horaDisponible.getMinutes() + 30);
      this.horasAtencion.push(horaDisponible);
    }

    //Buscar los turnos para el mismo día
    let turnosDelDia = listaTurnos.filter(turno => {
      let sonIguales = false;
      let turnoParseado:Date; 
      
      //Verificar que no estén cancelados ni rechazados
      if(turno.estado != estadoTurno.cancelado && turno.estado != estadoTurno.rechazado) {
        turnoParseado = turno.diaHora.toDate();
        turnoParseado = new Date(turnoParseado.toDateString());
        
        //Comparar turnos del mismo día
        if(Number(turnoParseado) === Number(this.diaSeleccionado)) {
          sonIguales = true;
        }
      }
      
      return sonIguales;
    });

    //Eliminar horarios que ya estan tomados
    this.eliminarHorarioTomado(turnosDelDia);
 
  }

  ///Elimina los horarios que ya fueron tomados para ese día
  eliminarHorarioTomado(turnosDelDia) {

    let turnoParseado;

    for(let turno of turnosDelDia) {
      turnoParseado = turno.diaHora.toDate();    
      for(let atencion of this.horasAtencion) {
        //Si son iguales lo elimino de la lista
        if(Number(turnoParseado) === Number(atencion)) {
          let index = this.horasAtencion.indexOf(atencion);

          if (index > -1) {
            this.horasAtencion.splice(index, 1);
            break;
          }
        }
      }      
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Confirmar', {
      duration: 2000,
    });
  }
}
