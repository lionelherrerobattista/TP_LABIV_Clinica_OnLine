import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-turno-cargar',
  templateUrl: './turno-cargar.component.html',
  styleUrls: ['./turno-cargar.component.css']
})
export class TurnoCargarComponent implements OnInit {

  pacienteParaDetalle:Observable<Usuario>;
  usuarioActual:Observable<Usuario>;

  constructor(
    private authService:AuthService,
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit(): void {
    this.buscarProfesional();
  }

  async buscarProfesional() {
    let usuarioLogeado = await this.authService.getUsuarioLogeado();

    if(usuarioLogeado != null) {

      this.usuarioActual = this.usuarioService.getUsuario(usuarioLogeado.uid)
    } 
  }

  tomarPacienteParaDetalle(paciente:Paciente){

    this.pacienteParaDetalle = this.usuarioService.getUsuario(paciente.uid);

  }

}
