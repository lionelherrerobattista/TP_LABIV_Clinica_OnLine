export class Profesional {
  id:number;
  nombre:string;
  apellido:string;
  dni:number;
  email:string;
  foto:string;
  especialidades:string[];
  aprobado:boolean;

  constructor(nombre:string, apellido:string, dni:number, email:string, foto:string, especialidades:string[]) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.foto = foto;
    this.especialidades = [];
    this.aprobado = false;//debe habilitarlo el administrador

    for(let especialidad of especialidades) {
      this.especialidades.push(especialidad);
    }

  }

  static validarDni(dni:string):boolean {
    let esValido = false;
    let regexStr = '^[0-9]*$';

    let regEx =  new RegExp(regexStr);

    if(regEx.test(dni)){
      esValido = true;
    }

    return esValido;

  }
}
