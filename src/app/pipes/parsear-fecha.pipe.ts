import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parsearFecha'
})
export class ParsearFechaPipe implements PipeTransform {

  transform(fechaFirebase: any, ): string {

    console.log(fechaFirebase)
    let date:Date = fechaFirebase.toDate();
    let fechaFormateada;

    
    const dateTimeFormat = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'long', day: '2-digit', hour:'2-digit',minute:"2-digit" }) 
    const [{ value: day },,{ value: month },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat .formatToParts(date ) 

    fechaFormateada = `${day} de ${month} de ${year} ${hour}:${minute}`

    return fechaFormateada;
  }

}
