export class Administrador {
  id:number;
  nombre:string;
  apellido:string;
  dni:number;
  email:string;
  foto:string;

  constructor(nombre:string, apellido:string, dni:number, email:string, foto:string) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.foto = foto;
  }
}
