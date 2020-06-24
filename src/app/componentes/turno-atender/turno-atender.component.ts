import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { Turno, estadoTurno } from 'src/app/clases/turno';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/clases/paciente';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Usuario } from 'src/app/clases/usuario';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turno-atender',
  templateUrl: './turno-atender.component.html',
  styleUrls: ['./turno-atender.component.css']
})
export class TurnoAtenderComponent implements OnInit {
  
  @Output() enviarDetallePaciente = new EventEmitter<Paciente>();
  @Output() enviarDetalleTurno = new EventEmitter<Turno>();
  @Input() usuarioActual:Observable<Usuario>;
  profesional:Profesional;
  turnosParaAtender:Turno[];
  turnosConfirmados:Turno[];
  displayedColumns: string[] = ['Día', 'Hora', 'Paciente', 'Estado', 'Acciones'];

  constructor(
    private usuarioService:UsuarioService,
    private turnoService:TurnoService,
  ) {
    this.turnosParaAtender= [];
  
   }

  ngOnInit(): void {
    this.buscarProfesional();
  }

  buscarProfesional() {

    this.usuarioActual.subscribe(usuario => {

      this.profesional = <Profesional>usuario;

      if(this.profesional != null && this.profesional.turnos) {

        this.turnosParaAtender = this.profesional.turnos.filter(turno =>
            turno.estado === estadoTurno.aceptado.toString()
          );
        
      }
    });
  }

  async atenderTurno(turno:Turno) {
    let indice;
    let paciente = <Paciente> await this.usuarioService.getUsuario(turno.paciente.uid).pipe(first()).toPromise();

    this.mostrarDetalle(turno.paciente);
    this.mostrarTurno(turno);

    //Modificar el estado:
    turno.estado= estadoTurno.atendido.toString();

    //Hacer esto dentro de la clase?
    for(let turnoGuardado of this.profesional.turnos) {
      //guardar turno con id y comparar
      if(turnoGuardado.idTurno == turno.idTurno) {
        indice = this.profesional.turnos.indexOf(turnoGuardado, 0);

        if(indice > -1) {
          //Sobreescribir el array de firebase:
          this.profesional.turnos.splice(indice, 1, turno);
        }

        break;
      }
    }

    //Hacer esto dentro de la clase?
    for(let turnoGuardado of paciente.turnos) {
      //guardar turno con id y comparar
      if(turnoGuardado.idTurno == turno.idTurno) {
        indice = paciente.turnos.indexOf(turnoGuardado, 0);

        if(indice > -1) {
          //Sobreescribir el array de firebase:
          paciente.turnos.splice(indice, 1, turno);
        }

        break;
      }
    }

    this.usuarioService.updateUsuario(this.profesional);
    this.usuarioService.updateUsuario(paciente);
    this.turnoService.updateTurno(turno);
    //Sumar una operacion
    this.usuarioService.guardarOperacion();

  }

  mostrarDetalle(paciente:Paciente) {

    this.enviarDetallePaciente.emit(paciente);

  }

  mostrarTurno(turno:Turno) {

    this.enviarDetalleTurno.emit(turno);

  }

}
