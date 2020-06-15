import { Usuario } from './usuario';
import { Encuesta } from './encuesta';


export class Paciente extends Usuario {
  
  fotoDos:string;
  encuestas:Encuesta[];

  constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, fotoUno:string, fotoDos:string) {

    super(uid, nombre, apellido, dni, email, fotoUno, 'paciente');
    
    this.fotoDos = fotoDos;
    this.encuestas = [];

  }
}
