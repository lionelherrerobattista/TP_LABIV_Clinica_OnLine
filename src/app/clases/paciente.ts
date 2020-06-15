import { Usuario } from './usuario';
import { Encuesta } from './encuesta';
import { Turno } from './turno';


export class Paciente extends Usuario {
  
  fotoDos:string;
  encuestas:Encuesta[];
  turnos:Turno[];

  constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, fotoUno:string, fotoDos:string) {

    super(uid, nombre, apellido, dni, email, fotoUno, 'paciente');
    
    this.fotoDos = fotoDos;
    this.encuestas = [];
    this.turnos = [];

  }
}
