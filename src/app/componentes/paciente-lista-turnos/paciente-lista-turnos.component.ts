import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Turno } from 'src/app/clases/turno';

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
  ) {

  }

  ngOnInit(): void {

    this.buscarPaciente();
  }

  async buscarPaciente() {
    let usuarioLogeado = await this.authService.getUsuarioLogeado();

    console.log(usuarioLogeado);

    if(usuarioLogeado != null) {

      this.usuarioService.getUsuario(usuarioLogeado.uid).subscribe(usuarioActual => {

        //Castear a paciente
        this.paciente = <Paciente>usuarioActual;

        console.log(this.paciente);
 
        if(this.paciente != null && this.paciente.turnos) {

          this.turnosPaciente = this.paciente.turnos;

          console.log(this.turnosPaciente)
        }

      });
    }  
  }

  cancelarTurno() {

  }

}
