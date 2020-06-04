export class Usuario {
    id:string;
    uid:string;
    nombre:string;
    apellido:string;
    dni:number;
    email:string;
    foto:string;
    perfil:string;
  
    constructor(uid:string, nombre:string, apellido:string, dni:number, email:string, foto:string, perfil:string) {

        this.uid = uid;        
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.foto = foto;
        this.perfil = perfil;
    }
}
