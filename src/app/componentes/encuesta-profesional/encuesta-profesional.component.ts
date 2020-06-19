import { Component, OnInit } from '@angular/core';
import { Pregunta, Encuesta, tipoEncuesta } from 'src/app/clases/encuesta';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-encuesta-profesional',
  templateUrl: './encuesta-profesional.component.html',
  styleUrls: ['./encuesta-profesional.component.css']
})
export class EncuestaProfesionalComponent implements OnInit {

  predisposicion;
  puntualidad;
  atenderOtraVez;
  comentarioProfesional;
  turnoSeleccionado;
  idturno;
  
  constructor(
    private encuestaService:EncuestaService,
    private turnoService:TurnoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router:Router,
  ) { 

    this.idturno = this.route.snapshot.paramMap.get('idTurno');
    this.turnoService.getTurno(this.idturno).subscribe(turno => {
      this.turnoSeleccionado = turno;
    })
  }

  ngOnInit(): void {
  }

  guardarEncuesta() {
    let preguntas:Pregunta[] = [];
    let preguntaUno:Pregunta;
    let preguntaDos:Pregunta;
    let preguntaTres:Pregunta;
    let encuesta:Encuesta;
    let respuestaTres:string;

    if(this.atenderOtraVez) {
      respuestaTres= "sí";
    } else {
      respuestaTres= 'no';
    }

    preguntaUno = {
      pregunta: "Predisposición",
      respuesta: this.predisposicion,
    }

    preguntaDos = {
      pregunta: "Puntualidad",
      respuesta: this.puntualidad,
    }

    preguntaTres = {
      pregunta: "¿Volvería a atenderlo?",
      respuesta: respuestaTres,
    }

    preguntas.push(preguntaUno);
    preguntas.push(preguntaDos);
    preguntas.push(preguntaTres);

    encuesta= new Encuesta(tipoEncuesta.sobrePaciente, this.turnoSeleccionado.paciente,
       this.turnoSeleccionado.profesional, this.turnoSeleccionado.idTurno, preguntas, this.comentarioProfesional);

    this.encuestaService.createEncuesta(encuesta);

    console.log("Encuesta Guardada!");
    console.log(encuesta);

    if(encuesta != null) {
      this.openSnackBar('¡Encuesta Guardada!');
    }

    this.router.navigate(['/principal']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Confirmar', {
      duration: 2000,
    });
  }

}
