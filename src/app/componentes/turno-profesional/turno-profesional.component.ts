import { Component, OnInit, Input } from '@angular/core';
import { Profesional} from 'src/app/clases/profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno, estadoTurno } from 'src/app/clases/turno';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-turno-profesional',
  templateUrl: './turno-profesional.component.html',
  styleUrls: ['./turno-profesional.component.css']
})
export class TurnoProfesionalComponent implements OnInit {

  
  @Input() usuarioActual:Observable<Usuario>;
  profesional:Profesional;
  turnosParaConfirmar:Turno[];
  turnosConfirmados:Turno[];
  displayedColumns: string[] = ['Día', 'Hora', 'Paciente', 'Estado', 'Acciones'];
  

  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
  ) {
    this.turnosParaConfirmar= [];
    this.turnosConfirmados= [];

    
   }

  ngOnInit(): void {
    this.cargarListas();
  }

  cargarListas() {

    this.usuarioActual.subscribe(usuario => {

      this.profesional = <Profesional>usuario;

      if(this.profesional != null && this.profesional.turnos) {

        this.turnosParaConfirmar = this.profesional.turnos.filter(turno =>
            turno.estado === estadoTurno.aConfirmar.toString()
          );

          console.log(this.turnosParaConfirmar);
          
          this.turnosConfirmados= this.profesional.turnos.filter(turno =>
            turno.estado === estadoTurno.aceptado.toString()
            );
      }     

    })
    
  }

  aceptarTurno(turno:Turno) {
    let indice;

    //Modificar el estado:
    turno.estado= estadoTurno.aceptado.toString();

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

  ///Borra el horario que recibe como parámetro
  cancelarTurno(turno:Turno) {
    let indice;

    //Modificar el estado:
    turno.estado= estadoTurno.rechazado.toString();

    for(let turnoGuardado of this.profesional.turnos) {
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
}
