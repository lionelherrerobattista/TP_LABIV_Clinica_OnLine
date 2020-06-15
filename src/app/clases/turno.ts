import { Paciente } from './paciente';

export enum estadoTurno {
    aceptado = "aceptado",
    rechazado = "rechazado",
    aConfirmar = "a confirmar",
    atendido = "atendido",
}
  
  
export class Turno {

    idTurno?:string;
    dia:string;
    hora:string;
    estado:string; //aceptado, rechazado, a confirmar
    nombreProfesional:string;
    especialidad:string;
    paciente:Paciente;

    constructor(dia:string, hora:string, estado:string, nombreProfesional:string, especialidad:string, paciente:Paciente) {
        this.dia= dia;
        this.hora= hora;
        this.estado= estado;
        this.nombreProfesional= nombreProfesional;
        this.especialidad= especialidad;
        this.paciente= paciente;   
    }
      
}
