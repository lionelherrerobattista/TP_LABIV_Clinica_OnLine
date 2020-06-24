import { Profesional } from './profesional';


export class Informe {
    profesional:Profesional;
    ultimoIngreso:any;
    totalIngresos:Date[];
    cantidadOperaciones:number;

    constructor(profesional:Profesional, ultimoIngreso:Date) {
        this.profesional= profesional;
        this.ultimoIngreso= ultimoIngreso;
    }
}
