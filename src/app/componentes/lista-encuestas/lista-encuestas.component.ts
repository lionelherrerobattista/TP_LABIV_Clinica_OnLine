import { Component, OnInit, Input } from '@angular/core';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Observable } from 'rxjs';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-lista-encuestas',
  templateUrl: './lista-encuestas.component.html',
  styleUrls: ['./lista-encuestas.component.css']
})
export class ListaEncuestasComponent implements OnInit {

  comentariosPacientes:Encuesta[];
  displayedColumns: string[] = ['Paciente', 'Comentario'];
  @Input() usuarioActual:Observable<Usuario>;
  profesional:Profesional;

  constructor(
    private encuestaService:EncuestaService,
  ) { }

  ngOnInit(): void {
    this.usuarioActual.subscribe(usuario => {
      this.profesional = <Profesional>usuario;


      this.encuestaService.getEncuestas().subscribe(listaEncuestas => {
        this.comentariosPacientes = listaEncuestas.filter(encuesta => encuesta.comentario != undefined && encuesta.usuarioObjetoEncuesta.uid == this.profesional.uid);
      })
    });
  }

}
