import { Usuario } from './usuario';

export class Administrador extends Usuario {
  
  perfil:string;

  constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, foto:string) {

    super(uid, nombre, apellido, dni, email, foto, 'administrador');
    
  }
}
