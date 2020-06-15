import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { Turno, estadoTurno } from 'src/app/clases/turno';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-turno-atender',
  templateUrl: './turno-atender.component.html',
  styleUrls: ['./turno-atender.component.css']
})
export class TurnoAtenderComponent implements OnInit {
  
  @Output() enviarDetallePaciente = new EventEmitter<Paciente>();
  profesional:Profesional;
  turnosParaAtender:Turno[];
  turnosConfirmados:Turno[];
  displayedColumns: string[] = ['Día', 'Hora', 'Paciente', 'Estado', 'Acciones'];

  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private router:Router
  ) {
    this.turnosParaAtender= [];
  
   }

  ngOnInit(): void {
    this.buscarProfesional();
  }

  async buscarProfesional() {
    let usuarioLogeado = await this.authService.getUsuarioLogeado();

    if(usuarioLogeado != null) {

      this.usuarioService.getUsuario(usuarioLogeado.uid).subscribe(usuarioActual => {

        //Castear a profesional
        this.profesional = <Profesional>usuarioActual[0];
 
        if(this.profesional != null && this.profesional.turnos) {

          this.turnosParaAtender = this.profesional.turnos.filter(turno =>
             turno.estado === estadoTurno.aceptado.toString()
            );
        }

      });
    }  
  }

  atenderTurno(turno:Turno) {
    let indice;

    this.mostrarDetalle(turno.paciente);

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
    this.usuarioService.updateUsuario(this.profesional);

  }

  mostrarDetalle(paciente:Paciente) {

    this.enviarDetallePaciente.emit(paciente);

  }

}
