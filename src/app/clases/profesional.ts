export class Profesional {
  id:number;
  nombre:string;
  apellido:string;
  dni:number;
  email:string;
  foto:string;
  especialidades:string[];
  aprobado:boolean;
  perfil:string;

  constructor(nombre:string, apellido:string, dni:number, email:string, foto:string, especialidades:string[]) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.foto = foto;
    this.especialidades = [];
    this.aprobado = false;//debe habilitarlo el administrador
    this.perfil = 'profesional';

    for(let especialidad of especialidades) {
      this.especialidades.push(especialidad);
    }

  }

}
