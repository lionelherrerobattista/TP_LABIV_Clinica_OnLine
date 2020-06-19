import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { Pregunta, Encuesta, tipoEncuesta } from 'src/app/clases/encuesta';
import { Turno, estadoTurno } from 'src/app/clases/turno';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-encuesta-paciente',
  templateUrl: './encuesta-paciente.component.html',
  styleUrls: ['./encuesta-paciente.component.css']
})
export class EncuestaPacienteComponent implements OnInit {

  @Input() paciente:Paciente;
  displayedColumns: string[] = ['Día', 'Hora', 'Profesional', 'Estado', 'Acciones'];
  turnoSeleccionado:Turno;
  encuestaSeleccionada:boolean;
  listaTurnosAtendidos:Turno[];
  comentarioDelPaciente:string;
  atencion:string;
  puntualidad:string;
  turnoOtraVez:string;
  profesional:Profesional;
  comentarioProfesional:string;

  constructor(
    private encuestaService:EncuestaService,
    private snackBar: MatSnackBar,
  ) {

    this.listaTurnosAtendidos = [];
    this.encuestaSeleccionada = false;
  }

  ngOnInit(): void {

    this.cargarTurnosAtendidos();
  }

  cargarTurnosAtendidos() {

    if(this.paciente != undefined) {

      this.listaTurnosAtendidos = this.paciente.turnos.filter(turno => turno.estado == estadoTurno.atendido);
    }
  }

  completarEncuesta(turnoSeleccionado:Turno) {
    this.encuestaSeleccionada = true;
    this.turnoSeleccionado = turnoSeleccionado;
    this.cargarComentarioProfesional(turnoSeleccionado.idTurno);
  }

  async cargarComentarioProfesional(idTurno:string){

    let listaEncuestas = await this.encuestaService.getEncuestas().pipe(first()).toPromise();

    for(let encuesta of listaEncuestas) {
      if(encuesta.comentario != undefined && encuesta.idTurno == idTurno) {
        this.comentarioProfesional = encuesta.comentario;
      }
    }

  }

  guardarEncuesta() {
    let preguntas:Pregunta[] = [];
    let preguntaUno:Pregunta;
    let preguntaDos:Pregunta;
    let preguntaTres:Pregunta;
    let encuesta:Encuesta;
    let respuestaTres:string;

    if(this.turnoOtraVez) {
      respuestaTres= "sí";
    } else {
      respuestaTres= 'no';
    }

    preguntaUno = {
      pregunta: "Atención",
      respuesta: this.atencion,
    }

    preguntaDos = {
      pregunta: "Puntualidad",
      respuesta: this.puntualidad,
    }

    preguntaTres = {
      pregunta: "¿Volvería a solicitar turno?",
      respuesta: respuestaTres,
    }

    preguntas.push(preguntaUno);
    preguntas.push(preguntaDos);
    preguntas.push(preguntaTres);

    encuesta= new Encuesta(tipoEncuesta.sobreProfesional, this.turnoSeleccionado.paciente,
       this.turnoSeleccionado.profesional, this.turnoSeleccionado.idTurno, preguntas, this.comentarioDelPaciente);

    this.encuestaService.createEncuesta(encuesta);

    console.log(encuesta);
    if(encuesta != undefined) {
      console.log("Encuesta guardada!");
      this.openSnackBar('¡Encuesta Guardada!');
      
    }
    
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Confirmar', {
      duration: 2000,
    });
  }

}
