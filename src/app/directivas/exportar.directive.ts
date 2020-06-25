import { Directive, Input, HostListener } from '@angular/core';
import { ArchivoService } from '../servicios/archivo.service';

@Directive({
  selector: '[appExportar]'
})
export class ExportarDirective {

  @Input('appExportar') lista: any[];
  @Input() nombreArchivo: string;

  constructor(private archivoService:ArchivoService) { }
  
  @HostListener('click', ['$event']) onClick($event) {
    console.log('clicked: ' + $event);
    this.archivoService.generarExcel(this.lista, this.nombreArchivo);
    this.archivoService.generarPdf(this.nombreArchivo, this.lista);
  }

}
