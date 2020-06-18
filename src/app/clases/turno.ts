import { Paciente } from './paciente';
import { Profesional } from './profesional';

export enum estadoTurno {
    aceptado = "aceptado",
    rechazado = "rechazado",
    aConfirmar = "a confirmar",
    atendido = "atendido",
    cancelado = "cancelado",
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

        //Saco el array de turnos
        this.profesional= profesional;
        

        //Saco el array de turnos
        this.paciente= paciente; 
        
    }

    
      
}
