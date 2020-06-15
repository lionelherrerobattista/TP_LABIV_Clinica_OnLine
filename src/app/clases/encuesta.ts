export enum tipoEncuesta {
    sobrePaciente,
    sobreProfesional,
}

export interface Pregunta{
    pregunta:string,
    respuesta:string,
}

export class Encuesta {
    idEncuesta?:string;
    tipo:tipoEncuesta;
    uidUsuarioEncuestado:string;
    uidUsuarioObjeto:string;
    idTurno:string;
    preguntas:Pregunta[];

    constructor(tipo:tipoEncuesta, uidUsuarioEncuestado:string, uidUsuarioObjeto:string, idTurno:string, preguntas:Pregunta[]) {
        this.tipo = tipo;
        this.uidUsuarioEncuestado = uidUsuarioEncuestado;
        this.uidUsuarioObjeto = uidUsuarioObjeto;
        this.preguntas = preguntas;
    }

}
