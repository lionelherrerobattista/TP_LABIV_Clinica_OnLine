import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogeado;

  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }

  obtenerUsuarioLogeado() {
    this.authService.getUsuarioLogeado().then( user => {
      this.usuarioLogeado = user;
      console.log(this.usuarioLogeado);
    });


  }

  cerrarSesion() {
    this.authService.cerrarSesion().then( resultado => {
      this.router.navigate(['login']);
    })
  }

}
