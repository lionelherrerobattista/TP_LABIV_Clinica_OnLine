import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogeado;
  perfilUsuario:Usuario;

  constructor(
    private authService:AuthService,
    private router:Router,
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }

  async obtenerUsuarioLogeado() {
    this.usuarioLogeado = await this.authService.getUsuarioLogeado();
    if(this.usuarioLogeado != null) {
      this.perfilUsuario = await this.usuarioService.getUsuarioActual();
    }

  }

  cerrarSesion() {
    this.authService.cerrarSesion().then( resultado => {
      this.router.navigate(['login']);
    })
  }


}
