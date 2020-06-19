import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Turno, estadoTurno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-lista-turnos',
  templateUrl: './paciente-lista-turnos.component.html',
  styleUrls: ['./paciente-lista-turnos.component.css']
})
export class PacienteListaTurnosComponent implements OnInit {

  paciente:Paciente;
  turnosPaciente:Turno[];
  displayedColumns: string[] = ['Día', 'Hora', 'Profesional', 'Estado', 'Acciones'];

  constructor(
    private authService:AuthService,
    private usuarioService:UsuarioService,
    private turnoService:TurnoService,
  ) {

  }

  ngOnInit(): void {

    this.buscarPaciente();
  }

  async buscarPaciente() {
    let usuarioLogeado = await this.authService.getUsuarioLogeado();

    if(usuarioLogeado != null) {

      this.usuarioService.getUsuario(usuarioLogeado.uid).subscribe(usuarioActual => {

        //Castear a paciente
        this.paciente = <Paciente>usuarioActual;
 
        if(this.paciente != null && this.paciente.turnos) {

          this.turnosPaciente = this.paciente.turnos;
        }

      });
    }  
  }

  async cancelarTurno(turno:Turno) {
    let profesional;

    profesional = await this.usuarioService.getUsuario(turno.profesional.uid).pipe(first()).toPromise();
    
    //Tomar las 3 entidades(turno, paciente, profesional)
    //cambiar estado a cancelado

    turno.estado = estadoTurno.cancelado;
    this.turnoService.updateTurno(turno);

    //buscar el turno del paciente y actualizar
    for(let turnoPaciente of this.paciente.turnos) {
      if(turno.idTurno == turnoPaciente.idTurno) {
        turnoPaciente.estado = estadoTurno.cancelado;
      }
    }

    this.usuarioService.updateUsuario(this.paciente);

    //buscar el turno del profesional y actualizar
    for(let turnoProfesional of profesional.turnos) {
      if(turno.idTurno == turnoProfesional.idTurno) {
        turnoProfesional.estado = estadoTurno.cancelado;
      }
    }

    this.usuarioService.updateUsuario(profesional);

    console.log("turno cancelado");

  }

}
