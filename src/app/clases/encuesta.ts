import { Usuario } from './usuario';

export enum tipoEncuesta {
    sobrePaciente = "sobre paciente",
    sobreProfesional = "sobre profesional",
}

export interface Pregunta{
    pregunta:string,
    respuesta:string,
}

export class Encuesta {
    idEncuesta?:string;
    tipo:tipoEncuesta;
    preguntas:Pregunta[];
    usuarioEncuestado:Usuario;
    usuarioObjetoEncuesta:Usuario;
    idTurno:string;
    comentario?:string;

    constructor(tipo:tipoEncuesta, usuarioEncuestado:Usuario, usuarioObjetoEncuesta:Usuario, idTurno:string, preguntas:Pregunta[], comentario?:string) {
        this.tipo = tipo;
        this.usuarioEncuestado = usuarioEncuestado;
        this.usuarioObjetoEncuesta = usuarioObjetoEncuesta;
        this.preguntas = preguntas;
        this.idTurno = idTurno;
        
        if(comentario) {
            this.comentario = comentario;
        }
        
    }

}
