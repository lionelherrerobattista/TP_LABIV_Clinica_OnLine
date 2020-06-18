
export interface datoExtra {
    nombreCampo:string;
    valor:string;
}

export class HistoriaClinica {
    idHistoriaClinica?:string;
    uidPaciente:string;
    uidProfesional:string;
    edad:number;
    temperaturaCorporal:number;
    presion:number;
    datosExtra?:datoExtra[];

    constructor(uidPaciente:string, uidProfesional:string, edad:number, temperaturaCorporal:number, presion:number, datosExtra?:datoExtra[]) {
        this.uidPaciente = uidPaciente;
        this.uidProfesional = uidProfesional;
        this.edad = edad;
        this.temperaturaCorporal = temperaturaCorporal;
        this.presion = presion;
        
        //Datos adicionales que puede cargar el profesional al atender al paciente
        this.datosExtra = [];
        if(datosExtra) {
            for(let dato of datosExtra) {
                this.datosExtra.push(dato);
            }
        }
    }
}
