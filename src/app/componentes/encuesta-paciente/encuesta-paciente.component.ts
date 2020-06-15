import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TurnoService } from 'src/app/servicios/turno.service';


@Component({
  selector: 'app-encuesta-paciente',
  templateUrl: './encuesta-paciente.component.html',
  styleUrls: ['./encuesta-paciente.component.css']
})
export class EncuestaPacienteComponent implements OnInit {

  predisposicion:string;
  puntualidad:string;
  atenderOtraVez:string;
  paciente:Paciente;
  profesional:Profesional;

  constructor(
    private authService:AuthService,
    private usuarioService:UsuarioService,
    private turnoService:TurnoService,

  ) {

  }

  ngOnInit(): void {

  }



  guardarEncuesta() {

  }

}
