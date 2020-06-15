import { Component, OnInit } from '@angular/core';
import { Profesional} from 'src/app/clases/profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno, estadoTurno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turno-profesional',
  templateUrl: './turno-profesional.component.html',
  styleUrls: ['./turno-profesional.component.css']
})
export class TurnoProfesionalComponent implements OnInit {

  
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
    this.buscarProfesional();
  }

  async buscarProfesional() {
    let usuarioLogeado = await this.authService.getUsuarioLogeado();

    if(usuarioLogeado != null) {

      this.usuarioService.getUsuario(usuarioLogeado.uid).subscribe(usuarioActual => {

        //Castear a profesional
        this.profesional = <Profesional>usuarioActual[0];
 
        if(this.profesional != null && this.profesional.turnos) {

          this.turnosParaConfirmar = this.profesional.turnos.filter(turno =>
             turno.estado === estadoTurno.aConfirmar.toString()
            );
            
            this.turnosConfirmados= this.profesional.turnos.filter(turno =>
              turno.estado === estadoTurno.aceptado.toString()
             );
        }     
      });
    }  
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
