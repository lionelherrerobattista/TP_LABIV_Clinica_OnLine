import { Usuario } from './usuario';

export class Profesional extends Usuario {
  
  especialidades:string[];
  aprobado:boolean;

  constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, foto:string, especialidades:string[]) {

    super(uid, nombre, apellido, dni, email, foto, 'profesional');
    
    this.especialidades = [];
    
    for(let especialidad of especialidades) {
      this.especialidades.push(especialidad);
    }

    this.aprobado = false;//debe habilitarlo el administrador

  }

}
