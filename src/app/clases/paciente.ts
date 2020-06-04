import { Usuario } from './usuario';


export class Paciente extends Usuario {
  
  fotoDos:string;

  constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, fotoUno:string, fotoDos:string) {

    super(uid, nombre, apellido, dni, email, fotoUno, 'paciente');
    
    this.fotoDos = fotoDos;

  }
}
