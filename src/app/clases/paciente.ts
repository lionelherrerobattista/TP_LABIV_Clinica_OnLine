

export class Paciente {
  id:number;
  nombre:string;
  apellido:string;
  dni:number;
  email:string;
  fotoUno:string;
  fotoDos:string;
  perfil:string;

  constructor(nombre:string, apellido:string, dni:number, email:string, fotoUno:string, fotoDos:string) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.fotoUno = fotoUno;
    this.fotoDos = fotoDos;
    this.perfil = 'paciente';

  }
}
