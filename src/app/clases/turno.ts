import { Paciente } from './paciente';
import { Profesional } from './profesional';

export enum estadoTurno {
    aceptado = "aceptado",
    rechazado = "rechazado",
    aConfirmar = "a confirmar",
    atendido = "atendido",
}
  
  
export class Turno {

    idTurno?:string;
    diaHora:any;
    estado:string; //aceptado, rechazado, a confirmar
    profesional:Profesional;
    paciente:Paciente;

    constructor(diaHora:any, profesional:Profesional, paciente:Paciente) {
        this.diaHora= diaHora;
        this.estado= estadoTurno.aConfirmar;
        this.profesional= profesional;
        this.paciente= paciente;   
    }
      
}
