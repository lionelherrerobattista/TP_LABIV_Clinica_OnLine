import { Usuario } from './usuario';
import { Turno } from './turno';
import { Encuesta } from './encuesta';


export interface HorarioAtencion {
  dia:string,
  horario:string,
}


export class Profesional extends Usuario {
  
  especialidades:string[];
  aprobado:boolean;
  diasAtencion:HorarioAtencion[];
  turnos:Turno[];
  encuestas:Encuesta[];

  constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, foto:string, especialidades:string[], diasAtencion?:HorarioAtencion[], turnos?:Turno[]) {

    super(uid, nombre, apellido, dni, email, foto, 'profesional');
    
    this.especialidades = [];
    
    for(let especialidad of especialidades) {
      this.especialidades.push(especialidad);
    }

    if(diasAtencion) {
      this.diasAtencion = diasAtencion;
    } else {
      this.diasAtencion = [];
    }

    if(turnos) {
      this.turnos = turnos;
    } else {
      this.turnos = [];
    }
    
    this.aprobado = false;//debe habilitarlo el administrador

  }

}
